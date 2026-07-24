const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const { registerProject, updateProject, getMyProject } = require('../controllers/projectController')

router.post('/registerProject', authMiddleware, registerProject)
router.put('/:id', authMiddleware, updateProject)
router.get('/', authMiddleware, getMyProject)

module.exports = router