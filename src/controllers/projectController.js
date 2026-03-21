const projectService = require('../services/projectService')

/**
 * 🔹 Create Project
 */
exports.createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body, req.user)

    res.status(201).json({
      status: 'success',
      data: project,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Get Projects
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getProjects(req.user)

    res.json({
      status: 'success',
      data: projects,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Get Project by ID
 */
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user)

    res.json({
      status: 'success',
      data: project,
    })
  } catch (err) {
    next(err)
  }
}
