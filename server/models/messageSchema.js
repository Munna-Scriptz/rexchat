const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation",
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    text: {
        type: String,
    },

    attachments: [{
        url: String,
        type: {
            type: String,
            enum: ["image", "video", "audio", "file"],
        },
        name: String,
        size: Number,
    }],

    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    },

    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    deletedFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    isEdited: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, });

module.exports = mongoose.model("message", messageSchema);