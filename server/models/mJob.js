const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    materialCategory: {
      type: String,
      default: undefined,
    },
    materialStyle: {
      type: String,
      default: undefined,
    },
    materialColor: {
      type: String,
      default: undefined,
    },
    materialHeight: {
      type: String,
      default: undefined,
    },
    removalCategory: {
      type: String,
      default: undefined,
    },
    removalAmount: {
      type: String,
      default: undefined,
    },
    owner_id: {
      type: String,
      requried: true,
    },
    deadline: {
      type: String,
      default: undefined,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "",
    },
    attachments: {
      type: [],
      default: undefined,
    },
    proposals: {
      type: [],
      default: undefined,
    },
    date_created: {
      type: Date,
      default: Date.now,
    },
    date_ends: {
      type: String,
      default: undefined,
    },
  },
  {
    collection: "job",
  }
);
// add pagination library
jobSchema.plugin(mongoosePaginate);

const job = mongoose.model("job", jobSchema);

module.exports = job;
