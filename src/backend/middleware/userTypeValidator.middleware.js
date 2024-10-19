const userTypeValidator = (requiredType) => {
  return (req, res, next) => {
    const userType = req.userType;

    if (userType !== requiredType) {
      return res.status(403).json({
        error: `Access denied: ${requiredType.charAt(0).toUpperCase() + requiredType.slice(1)}s only`,
      });
    }

    next();
  };
};

module.exports = userTypeValidator;
