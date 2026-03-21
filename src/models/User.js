const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true }
)

// 🔥 Index for performance
userSchema.index({ email: 1 })
userSchema.index({ organizationId: 1 })

module.exports = mongoose.model('User', userSchema)
