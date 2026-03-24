const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')
const activityController = require('../controllers/activityController')

/**
 * @swagger
 * /api/activity/project/{projectId}:
 *   get:
 *     summary: Get activity logs for a project
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: List of activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   action:
 *                     type: string
 *                     example: TASK_CREATED
 *                   details:
 *                     type: string
 *                     example: Task "Build API" created
 *                   userId:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                   createdAt:
 *                     type: string
 *                     example: 2024-01-01T12:00:00Z
 *       401:
 *         description: Unauthorized
 */
router.get('/project/:projectId', protect, activityController.getLogs)

module.exports = router
