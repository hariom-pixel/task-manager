const Project = require('../models/Project')
const { getCache, setCache, deleteCache } = require('../utils/cache')

/**
 * 🔹 Create Project
 */
exports.createProject = async (data, user) => {
  const project = await Project.create({
    name: data.name,
    organizationId: user.organizationId,
    createdBy: user.id,
  })

  await deleteCache(`projects:${user.organizationId}`)

  return project
}

/**
 * 🔹 Get All Projects (per org)
 */
exports.getProjects = async (user) => {
  const cacheKey = `projects:${user.organizationId}`

  const cached = await getCache(cacheKey)
  if (cached) {
    console.log('Cache HIT')
    return cached
  }

  console.log('Cache MISS')

  const projects = await Project.find({
    organizationId: user.organizationId,
  }).lean()

  await setCache(cacheKey, projects, 60)

  return projects
}

/**
 * 🔹 Get Single Project
 */
exports.getProjectById = async (projectId, user) => {
  const project = await Project.findOne({
    _id: projectId,
    organizationId: user.organizationId,
  }).lean()

  if (!project) {
    throw new Error('Project not found')
  }

  return project
}

/**
 * 🔹 Delete Project
 */
exports.deleteProject = async (projectId, user) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    organizationId: user.organizationId,
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  // Clear cache for this org
  await deleteCache(`projects:${user.organizationId}`)

  return { message: 'Project deleted successfully' }
}
