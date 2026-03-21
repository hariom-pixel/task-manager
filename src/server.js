require('dotenv').config()

const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(` Server running on ${PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
