const express = require('express')
const router = express.Router()
const {auth} = require('../middleware')
const {
  getAllStatistic,
  getMe
} = require('../controllers/statistic.controller')

router.get('/', auth, getAllStatistic)
router.get('/me', auth, getMe)


module.exports = router