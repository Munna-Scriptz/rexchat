const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { createPrivateConvo } = require('../controllers/convController')

// -------------------------- Sign Up
router.post('/private', authMiddleware, createPrivateConvo)

module.exports = router