const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const { registerProject } = require('../controllers/projectController')

router.post('/registerProject', authMiddleware, registerProject)

module.exports = router