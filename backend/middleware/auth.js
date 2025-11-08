const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const auth = req.header('Authorization')
  if (!auth) return res.status(401).json({ error: 'No token' })

  const parts = auth.split(' ')
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid token' })

  const token = parts[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.userId = payload.id
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
