const AuthOwner = require("../models/mOwner.js");

createOwnerWithEmail = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await AuthOwner.findOne({ email });

  if (userExists) {
    res.status(400);
    return next(new Error("User already exists"));
  }

  try {
    const user = await AuthOwner.create({
      email,
      password,
    });
    const token = generateToken(user, 201, res);

    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
    });

    res.cookie("role", "owner", {
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

updateOwner = async (req, res) => {
  const filter = { _id: req.user["_id"] };
  const update = { ...req.body };

  try {
    await AuthOwner.findOneAndUpdate(filter, update);

    res.status(201).json({
      success: true,
      message: "Profile Update Success",
    });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user, statusCode, res) => {
  return user.getSignedToken();
};

module.exports = {
  createOwnerWithEmail,
  updateOwner,
  logout,
};
