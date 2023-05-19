const User = require("../models/mUser");
const sendEmail = require("../utils/sendEmail");

const create = async (req, res, next) => {
  const { email, password, identifier } = req.body;
  const role = identifier == "sub" ? { sub: true } : { owner: true };

  // Check if user already exists
  const userExistsWithSameRole = await User.findOne({ email, ...role });
  const userExist = await User.findOne({ email });

  if (userExistsWithSameRole) {
    res.status(400);
    return next(new Error("User already exists"));
  } else if (userExist) {
    const filter = { _id: userExist["_id"] };
    const both = true;

    try {
      const user = await User.findOneAndUpdate(filter, { ...role });
      const current_user = {
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      };
      const token = generateToken(user, 201, res);

      res.cookie("token", token, {
        secure: true,
      });

      res.status(201).json({
        success: true,
        token,
        both,
        identifier,
        current_user,
      });

      res.status(201).json({
        success: true,
        message: "Profile Update Success",
      });
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const user = await User.create({
        email,
        password,
        ...role,
      });
      const current_user = {
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      };
      const token = generateToken(user, 201, res);
      const both = false;

      res.cookie("token", token, {
        secure: true,
      });

      res.status(201).json({
        success: true,
        token,
        both,
        identifier,
        current_user,
      });
    } catch (error) {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let both = false;
  let role = null;

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

  const current_user = {
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
  };
  const { owner, sub } = user;

  if (sub == true && owner == true) {
    both = true;
    role = "sub";
  } else if (sub == true) {
    role = "sub";
  } else {
    role = "owner";
  }

  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("User password does not match"));
    }

    const token = generateToken(user, 200, res);

    res.cookie("token", token, {
      secure: true,
    });

    res.status(200).json({
      success: true,
      token,
      both,
      role,
      current_user,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const update = { ...req.body };
  let both = false;
  let role = null;

  try {
    const updatedProfile = await User.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    const current_user = {
      first_name: updatedProfile.first_name,
      last_name: updatedProfile.last_name,
      avatar: updatedProfile.avatar,
    };

    const { owner, sub } = updatedProfile;

    if (sub == true && owner == true) {
      both = true;
      role = "sub";
    } else if (sub == true) {
      role = "sub";
    } else {
      role = "owner";
    }

    res.status(201).json({
      success: true,
      message: "Profile Update Success",
      updatedProfile,
      current_user,
      both,
      role,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

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

const logout = async (req, res, next) => {
  res.clearCookie("token");

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
  create,
  update,
  logout,
  forgotPassword,
};
