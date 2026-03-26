const taskService = require('../services/taskService')

/**
 * 🔹 Create Task
 */
exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user)

    const io = req.app.get('io')

    io.to(task.projectId.toString()).emit('activity', {
      action: 'TASK_CREATED',
      message: `Task "${task.title}" created`,
    })

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

    const io = req.app.get('io')

    io.to(task.projectId.toString()).emit('activity', {
      action: 'TASK_UPDATED',
      message: `Task "${task.title}" moved to ${task.status}`,
    })

    res.json({
      status: 'success',
      data: task,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Delete Task
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Assign Task
 */
exports.assignTask = async (req, res, next) => {
  try {
    const task = await taskService.assignTask(
      req.params.id,
      req.body.assignedTo,
      req.user
    )

    const io = req.app.get('io')

    io.to(task.projectId.toString()).emit('activity', {
      action: 'TASK_ASSIGNED',
      message: `Task "${task.title}" assigned to ${req?.user?.name}`,
    })

    res.json({
      success: true,
      data: task,
    })
  } catch (err) {
    next(err)
  }
}
