const express = require('express')
const router = express.Router()
const multer = require("multer")
const upload = multer()
const { signUp, checkUser, signIn, logout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// -------------------------- Sign Up
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', logout)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/check-user/:username', checkUser)
router.get('/profile', authMiddleware, getProfile)
router.patch('/updateProfile', authMiddleware, upload.single("avatar"), updateProfile)
router.post('/refreshAccessToken', refreshAccToken)

module.exports = router