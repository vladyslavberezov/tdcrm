const express = require('express')
const router = express.Router()
const {auth, role} = require('../middleware')
const {
  getUserById,
  getAllUsers,
  saveUser,
  deleteUser,
  getMe
} = require('../controllers/users.controller')

router.get('/', auth, getAllUsers)
router.get('/:id', auth, getUserById)
router.get('/:id', auth, deleteUser)
router.post('/', saveUser)
router.get('/me', auth, getMe)

module.exports = router
