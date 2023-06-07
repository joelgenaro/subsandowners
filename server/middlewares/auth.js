const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token = req.cookies.token;
  let User = require("../models/mUser");

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get user from token
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401);

    return next(new Error("Not authorized!"));
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized!"));
  }
};

module.exports = protect;
