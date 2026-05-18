const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    type: {
        type: String,
        default: "private",
        enum: ["private", "group"],
    },

    groupName: {
        type: String,
        trim: true,
    },

    groupAvatar: {
        type: String,
    },

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },],

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    },

    lastMessageSeen: {
        type: String,
    },

    lastMessageAt: {
        type: Date,
    },
    
}, { timestamps: true, });



module.exports = mongoose.model("conversation", conversationSchema);