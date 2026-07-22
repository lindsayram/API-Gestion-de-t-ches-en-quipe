const express = require('express')
const router = express.Router()
const { profile } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/profile', authMiddleware, profile)

module.exports = router
