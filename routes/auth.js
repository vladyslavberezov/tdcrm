const express = require('express')
const router = express.Router()
const { signIn, signUp}= require('../controllers/auth.controller')

router.post('/login', signIn)


module.exports = router