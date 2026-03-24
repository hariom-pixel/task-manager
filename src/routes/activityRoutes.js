const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')
const activityController = require('../controllers/activityController')

router.get('/project/:projectId', protect, activityController.getLogs)

module.exports = router
