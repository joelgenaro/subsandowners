const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    companyName: {
      type: String,
      default: "",
    },
    ownerName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    avatar: {
      type: Buffer,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "owners",
  }
);
const owner = mongoose.model("owner", ownerSchema);

module.exports = owner;
