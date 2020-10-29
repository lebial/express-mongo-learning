const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  // const { token: cookieToken } = req.cookies;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  // if (cookieToken) token = req.cookies.token;

  // Make sure token exists
  if (!token) return next(new ErrorResponse('Not authorized to acces this route', 401));

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to acces this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ErrorResponse(`User role ${req.user.role} is not authorized to acces this route`, 403));
  }
  next();
}
