const Application = require("../models/mApplication");
const User = require("../models/mUser");
const Job = require("../models/mJob");

const getData = async (req, res, next) => {
  try {
    const { jobId, candidateId } = await Application.findOne({
      _id: req.body.id,
    });

    const jobInfo = await Job.findOne({
      _id: jobId,
    });

    res.status(201).json({
      success: true,
      jobInfo,
    });
  } catch (error) {
    next(error);
  }
};

const acceptOffer = async (req, res, next) => {
  try {
    const { jobId } = await Application.findOneAndUpdate(
      { _id: req.body.id },
      { status: "hired" }
    );

    await Job.findOneAndUpdate({ _id: jobId }, { status: "hired" });

    const message = "accept";

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

const declineOffer = async (req, res, next) => {
  try {
    await Application.findOneAndUpdate(
      { _id: req.body.id },
      { status: "open" }
    );

    const message = "decline";

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  acceptOffer,
  declineOffer,
};
