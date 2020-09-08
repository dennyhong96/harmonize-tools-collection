const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

module.exports = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Please log in."));
  }
  next();
});
