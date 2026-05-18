const crypto = require("crypto")

const genResetToken = () => {
    try {
        const token = crypto.randomBytes(10).toString("hex") // token created
        const hashToken = crypto.createHash("sha256").update(token).digest("hex") // Hash created from token

        return { token, hashToken }
    } catch (error) {
        return null
    }
}

const hashResetToken = (token) => {
    try {
        const hashToken = crypto.createHash("sha256").update(token).digest("hex") // Hash created from token

        return hashToken
    } catch (error) {
        return null
    }
}

module.exports = { genResetToken, hashResetToken }