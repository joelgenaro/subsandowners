const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token = req.cookies.token;
  let identifier = req.cookies.role;

  let User =
    identifier == "sub"
      ? require("../models/mSubcontractors")
      : require("../models/mOwner");
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get user from token
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.clearCookie("token");
    res.clearCookie("role");
    res.status(401);

    return next(new Error("Not authorized, your token is expired!"));
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token!"));
  }
};

module.exports = protect;
