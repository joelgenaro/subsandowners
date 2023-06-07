const User = require("../models/mUser");
const states = require("../utils/states");

const getData = async (req, res, next) => {
  try {
    const userId = req.user["_id"];
    const { email, service_area } = await User.findOne({ _id: userId });

    res.status(201).json({
      success: true,
      email,
      service_area,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
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

const updateServiceArea = async (req, res, next) => {
  try {
    const { state, county } = req.body;
    const { service_area } = await User.findOneAndUpdate(
      { _id: req.user["_id"], "service_area.state": state.value },
      { $set: { "service_area.$.county": county } },
      {
        returnOriginal: false,
      }
    );

    res.status(201).json({
      success: true,
      service_area,
      message: "Service Area Update Success!",
    });
  } catch (error) {
    next(error);
  }
};

const reset_password = async (req, res, next) => {
  try {
    const userId = req.user["id"];
    const { current_password, new_password } = req.body;
    const user = await User.findOne({ _id: userId }).select("+password");
    const isMatch = await user.matchPasswords(current_password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("User password does not match"));
    }

    user.password = new_password;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  updateEmail,
  updateServiceArea,
  reset_password,
};
