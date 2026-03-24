const ActivityLog = require('../models/ActivityLog')

exports.getLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({
      projectId: req.params.projectId,
    })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })

    res.json(logs)
  } catch (err) {
    next(err)
  }
}
