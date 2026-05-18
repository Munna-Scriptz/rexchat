const userSchema = require("../models/userSchema")
const { sendEmail } = require("../services/emailServices")
const { forgetPassTemp } = require("../services/emailTemp")
const { generateAccToken, generateRefToken, verifyToken } = require("../services/tokens")
const { isValidEmail } = require("../utils/validations")
const { genResetToken, hashResetToken } = require("../utils/resetPassword")

// ========================== Sign Up ===========================
const signUp = async (req, res) => {
    try {
        const { email, phone, password } = req.body

        if (!email) return res.status(400).send({ message: 'Email is required!' })
        // ---------- Existing User 
        const existingUser = await userSchema.findOne({ email })
        if (existingUser) return res.status(400).send({ message: 'User with this email already exists. Please login!' })
        if (!phone) return res.status(400).send({ message: 'phone number is required!' })
        if (!password) return res.status(400).send({ message: 'Password is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })

        // ----------- Sent to DB 
        const user = new userSchema({
            email,
            phone,
            password,
        })

        user.save()


        // ------------------ Success 
        res.status(201).send({ message: 'Registration Successful' })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Check email =============================
const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).send({ message: "Email is required!", })
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) return res.status(409).send({ message: "User with this email already exists. Please login!", });

        // ------- Available 
        return res.status(200).send({ message: "Email is available", });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
};

// ========================== Sign In =============================
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ message: 'Email is required!' })
        if (!password) return res.status(400).send({ message: 'Password is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })
        // ---------- Existing User 
        const existingUser = await userSchema.findOne({ email })
        if (!existingUser) return res.status(404).send({ message: `User with this email doesn't exists. Please signUp!` })

        // --------- Compare password 
        const isValidPassword = await existingUser.comparePassword(password)
        if (!isValidPassword) return res.status(400).send({ message: 'Invalid or incorrect password!' })

        // ------------- JWT token and cookie
        const accToken = generateAccToken(existingUser)
        const refToken = generateRefToken(existingUser)
        res.cookie("X-AS-TOKEN", accToken)
        res.cookie("X-RF-TOKEN", refToken)

        // ------------ Success 
        res.status(200).send({ message: "Login Successfully completed!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Logout =============================
const logout = (req, res) => {
    try {
        res.clearCookie('X-AS-TOKEN')
        res.clearCookie('X-RF-TOKEN')
        res.status(200).send({ message: 'Logout Successful' })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Forget password ======================
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        // ----------- Validation 
        if (!email) return res.status(400).send({ message: 'Email is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })

        // ----------- Find From db
        const existingUser = await userSchema.findOne({ email })
        if (!existingUser) return res.status(400).send({ message: `email is not registered!` })

        // ------------- Send forget link to email
        const { token, hashToken } = genResetToken()
        const forgetPassLink = `${process.env.CLIENT_URL || 'http://localhost:8000/'}auth/resetPassword/${token}`
        sendEmail({ email, subject: "Forget password", item: forgetPassLink, template: forgetPassTemp })
        existingUser.resetPassTkn = hashToken
        existingUser.resetPassExp = Date.now() + 60 * 60 * 1000
        existingUser.save()


        // -------------- Success 
        res.status(200).send({ message: "Reset password link has been sent!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Reset password =======================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword } = req.body

        if (!token) return res.status(400).send({ message: "Invalid request" })
        if (!newPassword) return res.status(400).send({ message: "New password is required!" })

        // ------------- Verify hash and update token 
        const hashToken = hashResetToken(token)
        if (!hashToken) return res.status(400).send({ message: "Something went wrong!" })

        const existingUser = await userSchema.findOne({
            resetPassTkn: hashToken,
            resetPassExp: { $gt: Date.now() }
        }).select("password email")
        if (!existingUser) return res.status(400).send({ message: "Your link is invalid or expired!" })

        // --------------- Save modified  
        existingUser.password = newPassword
        existingUser.resetPassTkn = undefined
        existingUser.resetPassExp = undefined
        existingUser.save()

        // --------------- Success 
        res.status(200).send({ message: "Your password has been updated!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Get Profile ========================== 
const getProfile = async (req, res) => {
    try {
        if (!req.user?._id) return res.status(200).send(null)

        const userInfo = await userSchema.findById(req.user?._id).select('-password')
        if (!userInfo) return res.status(404).send({ message: "User doesn't exist" })

        // ------------- Success 
        res.status(200).send(userInfo)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Update Profile =======================
const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const { fullname, phone } = req.body

        // ------- Find from DB 
        const existingUser = await userSchema.findById(_id)
        if (fullname) existingUser.fullname = fullname
        if (phone) existingUser.phone = phone

        await existingUser.save()

        // ------------- Success 
        res.status(202).send({ message: "Profile updated", user: existingUser })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
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
        res.status(201).send("Token created")
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}




module.exports = { signUp, checkEmail, signIn, logout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken }