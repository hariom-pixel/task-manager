const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', protect, userController.getUsers)

module.exports = router
