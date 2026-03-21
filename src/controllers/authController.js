const authService = require('../services/authService')

/**
 * 🔹 Register
 */
exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body)

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * 🔹 Login
 */

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body)

    res.json({
      status: 'success',
      message: 'Login successful',
      data,
    })
  } catch (err) {
    next(err)
  }
}
