const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    budget: {
      type: String,
      default: "",
    },
    attachments: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "no hire",
    },
    ate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "projects",
  }
);
const project = mongoose.model("project", projectSchema);

module.exports = project;
