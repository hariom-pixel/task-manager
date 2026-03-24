const ActivityLog = require('../models/Activity')

exports.createLog = async ({ action, userId, taskId, projectId, details }) => {
  await ActivityLog.create({
    action,
    userId,
    taskId,
    projectId,
    details,
  })
}
