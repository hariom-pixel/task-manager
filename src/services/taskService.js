const Task = require('../models/Task')
const Project = require('../models/Project')
const emailQueue = require('../queues/emailQueue')
const User = require('../models/User')
const { deleteCache } = require('../utils/cache')
const activityService = require('./activityService')

/**
 * 🔹 Create Task
 */
exports.createTask = async (data, user) => {
  // Ensure project belongs to same org
  const project = await Project.findOne({
    _id: data.projectId,
    organizationId: user.organizationId,
  })

  if (!project) {
    throw new Error('Invalid project')
  }

  const task = await Task.create({
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    assignedTo: data.assignedTo,
    organizationId: user.organizationId,
  })

  if (data.assignedTo) {
    // fetch assigned user email
    const assignedUser = await User.findById(data.assignedTo)

    if (assignedUser) {
      emailQueue.add('sendEmail', {
        email: assignedUser.email,
        subject: 'New Task Assigned',
        message: `You have been assigned a new task: ${data.title}`,
      })
    }
  }

  activityService.createLog({
    action: 'TASK_CREATED',
    userId: user.id,
    taskId: task._id,
    projectId: task.projectId,
    details: `Task "${task.title}" created`,
  })

  return task
}

/**
 * 🔹 Get Tasks (by project)
 */
exports.getTasks = async (projectId, user) => {
  const tasks = await Task.find({
    projectId,
    organizationId: user.organizationId,
  }).lean()

  return tasks
}

/**
 * 🔹 Update Task Status
 */
exports.updateTaskStatus = async (taskId, status, user) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      organizationId: user.organizationId,
    },
    { status },
    { new: true }
  )

  if (!task) {
    throw new Error('Task not found')
  }

  activityService.createLog({
    action: 'TASK_STATUS_UPDATED',
    userId: user.id,
    taskId: task._id,
    projectId: task.projectId,
    details: `Status changed to ${status}`,
  })

  return task
}

/**
 * 🔹 Delete Task
 */
exports.deleteTask = async (taskId, user) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    organizationId: user.organizationId,
  })

  if (!task) {
    throw new Error('Task not found')
  }

  await deleteCache(`tasks:${task.projectId}`)

  await activityService.createLog({
    action: 'TASK_DELETED',
    userId: user.id,
    taskId: task._id,
    projectId: task.projectId,
    details: `Task deleted`,
  })

  return { message: 'Task deleted' }
}

/**
 * 🔹 Assign Task
 */
exports.assignTask = async (taskId, assignedTo, user) => {
  // Find task (secure by org)
  const task = await Task.findOne({
    _id: taskId,
    organizationId: user.organizationId,
  })

  if (!task) {
    throw new Error('Task not found')
  }

  // 🔹 Assign user
  task.assignedTo = assignedTo
  await task.save()

  // Send email (async)
  // if (assignedTo) {
  //   const assignedUser = await User.findById(assignedTo)

  //   if (assignedUser) {
  //     await emailQueue.add('sendEmail', {
  //       email: assignedUser.email,
  //       subject: 'Task Assigned',
  //       message: `You have been assigned task: ${task.title}`,
  //     })
  //   }
  // }

  activityService.createLog({
    action: 'TASK_ASSIGNED',
    userId: user.id,
    taskId: task._id,
    projectId: task.projectId,
    details: `Task assigned to user ${assignedTo}`,
  })

  return task
}
