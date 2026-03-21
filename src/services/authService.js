const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Organization = require('../models/Organization')

/**
 * 🔹 Register User (SaaS style)
 */
exports.register = async ({ name, email, password, organizationName }) => {
  // Check existing user
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  // Create Organization
  const organization = await Organization.create({
    name: organizationName,
  })

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create User linked to org
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'admin', // first user = admin
    organizationId: organization._id,
  })

  // Generate token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    token,
  }
}

/**
 * 🔹 Login User
 */
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    token,
  }
}
