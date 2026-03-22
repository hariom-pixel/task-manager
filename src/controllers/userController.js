const userService = require('../services/userService')

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.user.organizationId)

    res.json(users)
  } catch (err) {
    next(err)
  }
}
