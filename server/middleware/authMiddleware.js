const { verifyToken } = require("../services/tokens")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies
        // --------- Validations 
        if (!token["X-AS-TOKEN"]) return res.status(401).send({ message: 'Invalid request' })

        // ------- verify 
        const decoded = verifyToken(token["X-AS-TOKEN"])
        if (!decoded) return res.status(401).send({ message: 'Invalid request' })

        // ----- Set to req 
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send({ message: 'Invalid request' })
    }
}


module.exports = authMiddleware