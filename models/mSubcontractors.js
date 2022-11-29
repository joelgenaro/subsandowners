const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subcontractorSchema = new mongoose.Schema(
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
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    salary: {
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
    avatar: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "subcontractors",
  }
);

// add pagination library
subcontractorSchema.plugin(mongoosePaginate);

const subcontractor = mongoose.model("subcontractor", subcontractorSchema);

module.exports = subcontractor;
