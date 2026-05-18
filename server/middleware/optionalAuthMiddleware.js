const { verifyToken } = require("../services/tokens")

const optionalAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.["X-AS-TOKEN"]

        if (!token) {
            req.user = null
            return next()
        }

        const decoded = verifyToken(token)
        req.user = decoded || null

        next()
    } catch (error) {
        req.user = null
        next()
    }
}

module.exports = optionalAuthMiddleware