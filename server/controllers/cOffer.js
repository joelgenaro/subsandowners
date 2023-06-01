const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const { getOwnerInfo } = require("./cScontract.js");

const getData = async (req, res, next) => {
  try {
    const { jobId } = await Application.findOne({
      _id: req.body.id,
    });

    const jobInfo = await Job.findOne({
      _id: jobId,
    });

    const ownerInfo = await getOwnerInfo(jobInfo.owner_id);

    res.status(201).json({
      success: true,
      jobInfo,
      ownerInfo,
    });
  } catch (error) {
    next(error);
  }
};

const acceptOffer = async (req, res, next) => {
  const currentDate = new Date(Date.now());

  try {
    const { jobId } = await Application.findOneAndUpdate(
      { _id: req.body.id },
      { status: "hired" }
    );

    await Job.findOneAndUpdate(
      { _id: jobId, date_started: { $exists: false } },
      { status: "hired", date_started: currentDate }
    );

    await Application.findOneAndUpdate(
      { jobId: jobId, candidateId: req.user["_id"] },
      { status: "hired", date_started: currentDate }
    );

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
