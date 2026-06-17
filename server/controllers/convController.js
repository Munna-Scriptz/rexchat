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


// ════════════════════ Send Message ════════════════════
const sendMessage = async (req, res) => {
    try {
        const { text, conversation } = req.body

        // ---------- Existing Convo ------------
        if (!text) return resHandler.error(res, 400, "Text Content is required")
        if (!conversation) return resHandler.error(res, 400, "Conversation is required")

        const existingConvo = await conversationSchema.findOne({ _id: conversation })
        if (!existingConvo) return resHandler.error(res, 400, "Conversation doesn't exists")

        // ---------- Create Message ------------
        const message = await messageSchema.create({
            conversation,
            text,
            sender: req.user._id
        })

        existingConvo.lastMessage = text
        await existingConvo.save()
        global.io.to(conversation).emit("new_message", message);
        // ----------- Success 
        resHandler.success(res, 200, "Message sent")
    } catch (error) {
        console.log(error)
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

module.exports = { createPrivateConvo, convoList, convoSingle, sendMessage, getMessage }