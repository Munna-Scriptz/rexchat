const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { createPrivateConvo, convoList, convoSingle } = require('../controllers/convController')

// ------------------ Conversation ----------------
router.post('/private', authMiddleware, createPrivateConvo)
router.get('/list', authMiddleware, convoList)
router.get('/single/:id', authMiddleware, convoSingle)

module.exports = router