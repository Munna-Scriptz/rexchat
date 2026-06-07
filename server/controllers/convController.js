const conversationSchema = require("../models/conversationSchema")
const messageSchema = require("../models/messageSchema")
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
        }).populate("creator participant", "username displayName avatar")

        if (!existingConvo) return resHandler.error(res, 400, "Conversation Doesn't exists")

        const conversations = existingConvo.map(convo => {
            const conversation = convo.toObject();

            const isCreator = conversation.creator._id.toString() === req.user._id.toString();

            const { creator, participant, ...rest } = conversation;

            return {
                ...rest,
                chatUser: isCreator ? participant : creator,
            };
        });


        // ----------- Success 
        resHandler.success(res, 201, "Convo data Fetched", conversations)
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}


// ════════════════════ Send Message ════════════════════
const sendMessage = async (req, res) => {
    try {
        const { text, conversation } = req.body

        // ---------- Existing Convo ------------
        const existingConvo = await conversationSchema.findOne({ _id: conversation })
        if (!existingConvo) return resHandler.error(res, 400, "Conversation doesn't exists")

        // ---------- Create Message ------------
        await messageSchema.create({
            conversation,
            text,
            sender: req.user._id
        })

        // ----------- Success 
        resHandler.success(res, 200, "Message sent")
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}


// ════════════════════ Get Message ════════════════════
const getMessage = async (req, res) => {
    try {
        const { conversation } = req.params

        if (!conversation) return resHandler.error(res, 400, "Conversation is required")

        // ---------- Finding messages ------------
        const messages = await messageSchema.find({ conversation })
        if (!messages) return resHandler.error(res, 400, "Coudn't found any messages")


        // ----------- Success 
        resHandler.success(res, 200, "Message data fetched", messages)
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}

module.exports = { createPrivateConvo, convoList, sendMessage, getMessage }