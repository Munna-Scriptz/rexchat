const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { createPrivateConvo, convoList, convoSingle, sendMessage, getMessage } = require('../controllers/convController')

// ------------------ Conversation ----------------
router.post('/private', authMiddleware, createPrivateConvo)
router.post('/send-message', authMiddleware, sendMessage)

router.get('/list', authMiddleware, convoList)
router.get('/single/:id', authMiddleware, convoSingle)
router.get('/messages/:conversation', authMiddleware, getMessage)

module.exports = router