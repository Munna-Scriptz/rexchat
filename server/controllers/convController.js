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
        const newConvo = await conversationSchema.create({
            creator: req.user._id,
            participant,
        })
       
        // ----------- Success 
        resHandler.success(res, 201, "Private conversation created", newConvo._id )
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

// ════════════════════ Single Convo ════════════════════
const convoSingle = async (req, res) => {
    try {
        const convId = req.params.id

        // ---------- Existing Convo ------------
        const existingConvo = await conversationSchema.findOne({
            _id: convId
        }).populate("creator participant", "username displayName avatar")

        if (!existingConvo) return resHandler.error(res, 400, "Conversation Doesn't exists")


        const conversation = existingConvo.toObject();
        const isCreator = conversation.creator._id.toString() === req.user._id.toString();
        const { creator, participant, ...rest } = conversation;
        const formattedConversation = {
            ...rest,
            chatUser: isCreator ? participant : creator,
        };


        // ----------- Success 
        resHandler.success(res, 201, "Convo data Fetched", formattedConversation)
    } catch (error) {
        resHandler.error(res, 500, "Internal server error")
    }
}


module.exports = { createPrivateConvo, convoList, convoSingle }