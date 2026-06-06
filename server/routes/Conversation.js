const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { createPrivateConvo, convoList, sendMessage, getMessage } = require('../controllers/convController')

// -------------------------- Sign Up
router.post('/private', authMiddleware, createPrivateConvo)
router.post('/send-message', authMiddleware, sendMessage)
router.get('/list', authMiddleware, convoList)
router.get('/messages/:conversation', authMiddleware, getMessage)

module.exports = router