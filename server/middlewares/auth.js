const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("./async");

exports.protect = asyncHandler(async (req, _res, next) => {
  let token;

  const hasBearerAuthorization =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  if (hasBearerAuthorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token)
    return next(new ErrorResponse("Not authorize to access this API", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this API", 401));
  }
});
