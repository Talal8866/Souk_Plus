const userTypeValidator = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.type)) {
    return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
  }
  next();
};

module.exports = userTypeValidator;
