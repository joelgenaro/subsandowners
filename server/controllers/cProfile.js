const Application = require("../models/mApplication");
const User = require("../models/mUser");
const Job = require("../models/mJob");

const getProfile = async (req, res, next) => {
  try {
    console.log(req.body);

    const profile = await User.findOne({ _id: req.body });

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
