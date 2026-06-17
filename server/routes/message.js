const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { sendMessage, getMessage, markAsSeen } = require('../controllers/messageController')

// ------------------ Conversation ----------------
router.post('/send', authMiddleware, sendMessage)
router.patch('/seen/:conversation', authMiddleware, markAsSeen)
router.get('/:conversation', authMiddleware, getMessage)

module.exports = router