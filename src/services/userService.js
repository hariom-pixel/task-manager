const User = require('../models/User')

exports.getUsers = async (organizationId) => {
  const users = await User.find({
    organizationId: organizationId,
  }).select('name email')

  return users
}
