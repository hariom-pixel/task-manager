const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user info to request
    req.user = decoded

    next()
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    })
  }
}
