const conversationSchema = require("../models/conversationSchema")
const resHandler = require("../utils/resHandler")

// ════════════════════ Create Private Convo ════════════════════
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

// ════════════════════ Convo List ════════════════════
const convoList = async (req, res) => {
    try {
        // ---------- Existing Convo ------------
        const existingConvo = await conversationSchema.find({
            $or: [
                { creator: req.user._id },
                { participant: req.user._id },
            ]
        }).populate("creator participant", "username displayName avatar -_id")

        if (!existingConvo) return resHandler.error(res, 400, "Conversation Doesn't exists")

        // ----------- Success 
        resHandler.success(res, 201, "Convo data Fetched", existingConvo)
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}


module.exports = { createPrivateConvo, convoList }