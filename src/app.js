const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const app = express()

app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const protect = require('./middleware/authMiddleware')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const activityRoutes = require('./routes/activityRoutes')

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('SaaS API Running')
})

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'You are authorized',
    user: req.user,
  })
})

app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/activity/', activityRoutes)

module.exports = app
