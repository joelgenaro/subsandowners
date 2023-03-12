const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    owner: {
      type: Boolean,
      default: false,
    },
    sub: {
      type: Boolean,
      default: false,
    },
    first_name: {
      type: String,
      default: undefined,
    },
    last_name: {
      type: String,
      default: undefined,
    },
    profile: {
      type: String,
      default: undefined,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    last_sign_in: {
      type: String,
      default: undefined,
    },
    country: {
      type: String,
      default: undefined,
    },
    city: {
      type: String,
      default: undefined,
    },
    address: {
      type: String,
      default: undefined,
    },
    language: {
      type: String,
      default: undefined,
    },
    ranking: {
      type: Number,
      default: undefined,
    },
    website: {
      type: String,
      default: undefined,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      default: undefined,
    },
    is_fav: {
      type: Boolean,
      default: false,
    },
    fav_subs: {
      type: Array,
      default: [],
    },
    fav_jobs: {
      type: Array,
      default: [],
    },
    fav_owners: {
      type: String,
      default: undefined,
    },
    salary: {
      type: String,
      default: undefined,
    },
    phone: {
      type: String,
      default: undefined,
    },
    avatar: {
      type: String,
      default: undefined,
    },
    join_date: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    collection: "user",
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 60 * (60 * 1000);
  return resetToken;
};

// add pagination library
userSchema.plugin(mongoosePaginate);

const user = mongoose.model("user", userSchema);

module.exports = user;
