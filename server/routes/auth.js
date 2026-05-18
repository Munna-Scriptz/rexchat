const express = require('express')
const router = express.Router()
const { signUp, checkEmail, signIn, logout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware')

// -------------------------- Sign Up
router.post('/signup', signUp)
router.post('/check-email', checkEmail)
router.post('/signin', signIn)
router.post('/logout', logout)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/profile', optionalAuthMiddleware, getProfile)
router.put('/updateProfile', authMiddleware, updateProfile)
router.post('/refreshAccessToken', refreshAccToken)

module.exports = router