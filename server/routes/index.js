const express = require('express')
const router = express.Router()
const auth = require('./auth')
const conversation = require('./conversation')
const message = require('./message')

// ------------ All routes 
router.use('/auth', auth)
router.use('/conv', conversation)
router.use('/message', message)



router.get('/', (req, res)=>{
    res.send("Hello world")
})


// --------- Not Found 
router.use((req, res) => { res.status(404).send('404 Page Not Found') })

module.exports = router