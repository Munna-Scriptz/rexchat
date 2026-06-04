const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    resetPassTkn: {
        type: String
    },
    resetPassExp: {
        type: Date
    },

}, { timestamps: true })


// ------------------ password Hash create ----------------
userSchema.pre("save", async function () {
    const user = this;
    if (!user.isModified("password")) {
        return;
    }

    try {
        user.password = await bcrypt.hash(user.password, 10);
    } catch (err) { }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('user', userSchema)