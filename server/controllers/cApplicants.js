const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const myCustomLabels = require("../utils/paginationLabel");

const updateJob = async (req, res, next) => {
  try {
    await Job.updateOne({ _id: req.body["_id"] }, { $set: { ...req.body } });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getProposals = async (req, res, next) => {
  const options = {
    page: req.query.page,
    limit: 15,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  const query = {
    $and: [
      {
        jobId: { $eq: req.body.id },
      },
      {
        status: { $ne: "hired" },
      },
    ],
  };

  try {
    const data = await Application.paginate(query, options);

    const itemsList = data.itemsList;
    const paginator = data.paginator;

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
    });
  } catch (error) {
    next(error);
  }
};

const sendOffer = async (req, res, next) => {
  const currentDate = Date.now();

  try {
    await Job.findOneAndUpdate(
      { _id: req.body.jobId },
      { status: "interviewing", date_updated: currentDate }
    );

    await Application.findOneAndUpdate(
      { jobId: req.body.jobId, candidateId: req.body.candidateId },
      { status: "sendOffer" }
    );

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateJob,
  sendOffer,
  getProposals,
};
