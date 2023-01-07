const AuthSubcontractor = require("../models/mSubcontractors.js");
const AuthOwner = require("../models/mOwner.js");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const createSubcontractorWithEmail = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await AuthSubcontractor.findOne({ email });

  if (userExists) {
    res.status(400);
    return next(new Error("User already exists"));
  }

  try {
    const user = await AuthSubcontractor.create({
      email,
      password,
    });
    const token = generateToken(user, 201, res);

    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
    });

    res.cookie("role", "sub", {
      // httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const Owner = await AuthOwner.findOne({ email }).select("+password");
  const Subcontractor = await AuthSubcontractor.findOne({ email }).select(
    "+password"
  );

  if (!Owner && !Subcontractor) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

  const user = Owner ? Owner : Subcontractor;
  const role = Owner ? "owner" : "sub";

  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("User password does not match"));
    }

    const token = generateToken(user, 200, res);

    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
    });
    res.cookie("role", role, {
      // httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubcontractor = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const update = { ...req.body };

  try {
    await AuthSubcontractor.findOneAndUpdate(filter, update);

    res.status(201).json({
      success: true,
      message: "Profile Update Success",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // Check if user exists
  const Owner = await AuthOwner.findOne({ email });
  const Subcontractor = await AuthSubcontractor.findOne({ email });

  if (!Owner && !Subcontractor) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

  const user = Owner ? Owner : Subcontractor;
  const role = Owner ? "owner" : "sub";

  try {
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      });
      return res.status(200).json({
        success: true,
        message: "Email was sent!",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      res.status(500);
      return next(new Error("Email could not be sent"));
    }
  } catch (error) {
    next(error);
  }
};

// Logout user   =>
logout = async (req, res, next) => {
  res.clearCookie("token");
  res.clearCookie("role");

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

const generateToken = (user, statusCode, res) => {
  return user.getSignedToken();
};

module.exports = {
  login,
  createSubcontractorWithEmail,
  updateSubcontractor,
  logout,
  forgotPassword,
};
