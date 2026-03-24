const ActivityLog = require('../models/ActivityLog')

exports.createLog = async ({ action, userId, taskId, projectId, details }) => {
  await ActivityLog.create({
    action,
    userId,
    taskId,
    projectId,
    details,
  })
}
