const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('<h1>hello<h1/>')

})

module.exports = router
