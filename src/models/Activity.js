const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Activity', activitySchema)
