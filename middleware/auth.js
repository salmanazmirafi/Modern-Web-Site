const ErrorHandler = require("../utils/erorHeandelar");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 401));

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decode.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};
