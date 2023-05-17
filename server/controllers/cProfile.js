const Application = require("../models/mApplication");
const User = require("../models/mUser");
const Job = require("../models/mJob");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.body.id != null ? req.body.id : req.user["_id"];
    const profile = await User.findOne({ _id: userId });

    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
};
