const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      default: "",
      requried: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    deadline: {
      type: String,
      default: "",
    },
    attachments: {
      type: [[String]],
      default: "",
    },
    materialCategory: {
      type: String,
      default: "",
    },
    materialStyle: {
      type: String,
      default: "",
    },
    materialColor: {
      type: String,
      default: "",
    },
    materialHeight: {
      type: String,
      default: "",
    },
    removalCategory: {
      type: String,
      default: "",
    },
    removalAmount: {
      type: String,
      default: "",
    },
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "projects",
  }
);

projectSchema.plugin(mongoosePaginate);

const project = mongoose.model("project", projectSchema);

module.exports = project;
