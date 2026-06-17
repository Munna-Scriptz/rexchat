const conversationSchema = require("../models/conversationSchema")
const messageSchema = require("../models/messageSchema")
const resHandler = require("../utils/resHandler")


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



module.exports = { sendMessage, getMessage }