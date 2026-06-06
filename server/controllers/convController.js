const conversationSchema = require("../models/conversationSchema")
const resHandler = require("../utils/resHandler")

const createPrivateConvo = async (req, res) => {
    try {
        const { participant } = req.body
        if (!participant) return resHandler.error(res, 400, "Participant is required")

        // ---------- Existing Convo ------------
        const existingConvo = await conversationSchema.findOne({
            $or: [
                { creator: req.user._id, participant },
                { participant, creator: req.user._id }
            ]
        })

        if (existingConvo) return resHandler.error(res, 400, "Conversation already exists")

        // ---------- Create Convo ------------
        await conversationSchema.create({
            creator: req.user._id,
            participant,
        })

        // ----------- Success 
        resHandler.success(res, 201, "Private conversation created")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}



module.exports = { createPrivateConvo }