require('dotenv').config()

const app = require('./app')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3001

const startServer = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(process.env.DB_URI)
    console.log('MongoDB connected')

    // Create HTTP server
    const server = http.createServer(app)

    // Setup Socket.IO
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    })

    // Make io available globally
    app.set('io', io)

    // Socket events
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      socket.on('joinProject', (projectId) => {
        socket.join(projectId)
      })

      socket.on('disconnect', () => {
        console.log('User disconnected')
      })
    })

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
