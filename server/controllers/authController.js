const userSchema = require("../models/userSchema")
const { sendEmail } = require("../services/emailServices")
const { forgetPassTemp } = require("../services/emailTemp")
const { generateAccToken, generateRefToken, verifyToken } = require("../services/tokens")
const { isValidEmail } = require("../utils/validations")
const { genResetToken, hashResetToken } = require("../utils/resetPassword")
const resHandler = require("../utils/resHandler")

// ========================== Sign Up ===========================
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body

        // ---------- Validation 
        if (!username) return resHandler.error(res, 400, "Username is required")
        if (!email) return resHandler.error(res, 400, "Email is required")
        if (!isValidEmail(email)) return resHandler.error(res, 400, "Email is not valid")
        if (!password) return resHandler.error(res, 400, "Password is required")

        // ---------- Existing User 
        const existingUser = await userSchema.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            if (existingUser.username == username) return resHandler.error(res, 400, "Username already taken");
            if (existingUser.email == email) return resHandler.error(res, 400, "Email already registered");
        }

        // ----------- Sent to DB 
        const user = new userSchema({
            username,
            email,
            password,
        })

        user.save()


        // ------------------ Success 
        resHandler.success(res, 201, "Account created successfully")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Check user =============================
const checkUser = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) return resHandler.error(res, 400, "Email is required")
        const existingUser = await userSchema.findOne({ username });
        if (existingUser) return resHandler.error(res, 400, "Username is already taken")

        // ------- Available 
        return resHandler.error(res, 200, "Username is available")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
};

// ========================== Sign In =============================
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username) return resHandler.error(res, 400, "Username is required!")
        if (!password) return resHandler.error(res, 400, "Password is required!")

        // ---------- Existing User 
        const existingUser = await userSchema.findOne({
            $or: [
                { email: username },
                { username: username },
            ],
        });
        if (!existingUser) return resHandler.error(res, 404, "User with this username or email doesn't exists")

        // --------- Compare password 
        const isValidPassword = await existingUser.comparePassword(password)
        if (!isValidPassword) return resHandler.error(res, 400, "Invalid or incorrect password!")

        // ------------- JWT token and cookie
        const accToken = generateAccToken(existingUser)
        const refToken = generateRefToken(existingUser)
        res.cookie("X-AS-TOKEN", accToken)
        res.cookie("X-RF-TOKEN", refToken)

        // ------------ Success 
        resHandler.success(res, 200, "Login Successful")
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Logout =============================
const logout = (req, res) => {
    try {
        res.clearCookie('X-AS-TOKEN')
        res.clearCookie('X-RF-TOKEN')
        resHandler.success(res, 200, "Logout Successful")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Forget password ======================
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        // ----------- Validation 
        if (!email) return resHandler.error(res, 400, "Email is required!")
        if (!isValidEmail(email)) return resHandler.error(res, 400, "Email is not valid!")

        // ----------- Find From db
        const existingUser = await userSchema.findOne({ email })
        if (!existingUser) return resHandler.error(res, 400, "email is not registered!")

        // ------------- Send forget link to email
        const { token, hashToken } = genResetToken()
        const forgetPassLink = `${process.env.CLIENT_URL || 'http://localhost:8000/'}auth/resetPassword/${token}`
        sendEmail({ email, subject: "Forget password", item: forgetPassLink, template: forgetPassTemp })
        existingUser.resetPassTkn = hashToken
        existingUser.resetPassExp = Date.now() + 60 * 60 * 1000
        existingUser.save()


        // -------------- Success 
        resHandler.success(res, 200, "Reset password link has been sent!")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Reset password =======================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword } = req.body

        if (!token) return resHandler.error(res, 400, "Invalid request")
        if (!newPassword) return resHandler.error(res, 400, "New password is required!")

        // ------------- Verify hash and update token 
        const hashToken = hashResetToken(token)
        if (!hashToken) return resHandler.error(res, 400, "Something went wrong!")

        const existingUser = await userSchema.findOne({
            resetPassTkn: hashToken,
            resetPassExp: { $gt: Date.now() }
        }).select("password email")
        if (!existingUser) return resHandler.error(res, 400, "Your link is invalid or expired!")

        // --------------- Save modified  
        existingUser.password = newPassword
        existingUser.resetPassTkn = undefined
        existingUser.resetPassExp = undefined
        existingUser.save()

        // --------------- Success 
        resHandler.success(res, 200, "Your password has been updated!")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Get Profile ========================== 
const getProfile = async (req, res) => {
    try {
        if (!req.user?._id) return resHandler.success(res, 200, "Profile fetched successfully", null)

        const userInfo = await userSchema.findById(req.user?._id).select('-password')
        if (!userInfo) return resHandler.error(res, 404, "User doesn't exist")

        // ------------- Success 
        resHandler.success(res, 200, "Profile fetched successfully", userInfo)
    } catch (error) {
        console.log(error)
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Update Profile =======================
const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const { username, email } = req.body

        // ------- Find from DB 
        const existingUser = await userSchema.findById(_id)
        if (username) existingUser.username = username
        if (email) existingUser.email = email

        await existingUser.save()

        // ------------- Success 
        resHandler.success(res, 202, "Profile updated", existingUser)
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

// ========================== Refresh access token =================
const refreshAccToken = (req, res) => {
    try {
        const refreshToken = req.cookies?.["X-RF-TOKEN"]

        // ----- Validation 
        if (!refreshToken) return

        // -------- verify, generate and set it to cookies 
        const decoded = verifyToken(refreshToken)
        const accToken = generateAccToken(decoded)
        res.cookie("X-AS-TOKEN", accToken)

        // ---------- Success 
        resHandler.success(res, 201, "Token created")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}




module.exports = { signUp, checkUser, signIn, logout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken }