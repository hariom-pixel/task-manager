const taskService = require('../services/taskService')

/**
 * 🔹 Create Task
 */
exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user)

    res.status(201).json({
      status: 'success',
      data: task,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Get Tasks
 */
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.params.projectId, req.user)

    res.json({
      status: 'success',
      data: tasks,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Update Task Status
 */
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status,
      req.user
    )

    res.json({
      status: 'success',
      data: task,
    })
  } catch (err) {
    next(err)
  }
}
