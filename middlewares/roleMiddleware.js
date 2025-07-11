const { errorResponse } = require('../utils/responseFactory');

function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    if (!req.user || req.user.role !== requiredRole) {
      return errorResponse(res, 'Forbidden: insufficient role', {}, 403);
    }
    next();
  };
}

module.exports = roleMiddleware; 