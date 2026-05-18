const { verifyToken } = require("../services/tokens")
const resHandler = require("../utils/resHandler")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies
        // --------- Validations 
        if (!token["X-AS-TOKEN"]) return resHandler.error(res, 401, "Invalid request")

        // ------- verify 
        const decoded = verifyToken(token["X-AS-TOKEN"])
        if (!decoded) return resHandler.error(res, 401, "Invalid request")

        // ----- Set to req 
        req.user = decoded
        next()
    } catch (error) {
        resHandler.error(res, 401, "Invalid request")
    }
}


module.exports = authMiddleware