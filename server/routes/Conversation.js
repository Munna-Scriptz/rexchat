const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { createPrivateConvo, convoList } = require('../controllers/convController')

// -------------------------- Sign Up
router.post('/private', authMiddleware, createPrivateConvo)
router.get('/list', authMiddleware, convoList)

module.exports = router