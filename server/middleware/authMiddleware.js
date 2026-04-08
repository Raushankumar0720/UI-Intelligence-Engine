/**
 * server/middleware/authMiddleware.js — Authentication middleware.
 * Task 5: Authentication (Light Backend)
 * Task 8: Security (JWT protection)
 */
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header found' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer [token]"
  if (!token) {
    return res.status(401).json({ message: 'No token found in authorization header' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
