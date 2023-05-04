const { ObjectId, Decimal128 } = require("mongodb");
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
    ownerFeedback: {
      stars: {
        type: Decimal128,
        default: 0,
      },
      feedback: {
        type: String,
        default: "",
      },
    },
    subFeedback: {
      stars: {
        type: Decimal128,
        default: 0,
      },
      feedback: {
        type: String,
        default: "",
      },
    },
    date_created: {
      type: Date,
      default: Date.now,
    },
    date_started: {
      type: String,
      default: undefined,
    },
    date_completed: {
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
