const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

// Middleware for authenticating JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info to request
    next();
  });
};

module.exports = authenticateToken;
