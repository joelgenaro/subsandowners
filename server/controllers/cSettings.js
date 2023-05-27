const Application = require("../models/mApplication");
const User = require("../models/mUser");
const Job = require("../models/mJob");

const getData = async (req, res, next) => {
  try {
    const userId = req.user["_id"];
    const { email } = await User.findOne({ _id: userId });

    res.status(201).json({
      success: true,
      email,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    // Check if user already exists
    const email = req.body.email;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      return next(new Error("Same email already exists"));
    } else {
      await User.findOneAndUpdate({ _id: req.user["_id"] }, { email: email });

      res.status(201).json({
        success: true,
        email,
        message: "Email Update Success!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  updateEmail,
};
