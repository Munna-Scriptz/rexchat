const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    type: {
        type: String,
        default: "private",
        enum: ["private", "group"],
    },

    GroupParticipants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    groupName: {
        type: String,
        trim: true,
    },

    groupAvatar: {
        type: String,
    },

    groupAdmins: [{
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