const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: ObjectId,
      required: true,
    },
    candidateId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "open",
    },
    jobTitle: {
      type: String,
      default: undefined,
    },
    bidAmount: {
      type: String,
      default: undefined,
    },
    deliveryDate: {
      type: String,
      default: undefined,
    },
    jobTitle: {
      type: String,
      default: undefined,
    },
    proposal: {
      type: String,
      default: undefined,
    },
    date_created: {
      type: Date,
      default: Date.now,
    },
    date_updated: {
      type: String,
      default: undefined,
    },
  },
  {
    collection: "application",
  }
);

// add pagination library
applicationSchema.plugin(mongoosePaginate);

const application = mongoose.model("application", applicationSchema);

module.exports = application;
