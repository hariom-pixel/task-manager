const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, taskController.createTask)
router.get('/:projectId', protect, taskController.getTasks)
router.patch('/:id/status', protect, taskController.updateTaskStatus)

module.exports = router
