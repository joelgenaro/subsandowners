const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");
const myCustomLabels = require("../utils/paginationLabel");

const getApplications = async (req, res, next, status) => {
  const options = {
    page: req.body.page,
    limit: 15,
    customLabels: myCustomLabels,
  };
  const type = req.body.type;
  const jobId = req.body.id;

  const query = {
    jobId: { $eq: jobId },
    status: { $in: status },
  };

  try {
    const data = await Application.paginate(query, options);
    const itemsListApplications = data.itemsList;
    const paginator = data.paginator;
    const promises = itemsListApplications.map((item) => getUserInfo(item));
    const itemsList = await Promise.all(promises);

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
      type,
    });
  } catch (error) {
    next(error);
  }
};

const getProposals = async (req, res, next) => {
  const status = ["open", "sendOffer", "interviewing"];
  getApplications(req, res, next, status);
};

const getHiredCandidates = async (req, res, next) => {
  const status = ["hired", "end", "requestFeedback"];
  getApplications(req, res, next, status);
};

const updateJob = async (req, res, next) => {
  const { _id, ...updateParams } = req.body;
  const message = "Project Update Success";

  try {
    await Job.updateOne({ _id }, { $set: updateParams });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (item) => {
  const userInfo = await User.findOne({ _id: item.candidateId });

  return {
    ...item._doc,
    candidate: {
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      avatar: userInfo.avatar,
      country: userInfo.country,
      company: userInfo.company,
    },
  };
};

const sendOffer = async (req, res, next) => {
  const jobId = req.body.jobId;
  const candidateId = req.body.candidateId;
  const message = "Offer Send Success";

  try {
    await Job.findOneAndUpdate({ _id: jobId }, { status: "interviewing" });

    await Application.findOneAndUpdate(
      { jobId: jobId, candidateId: candidateId },
      { status: "sendOffer" }
    );

    res.status(201).json({
      success: true,
      candidateId,
      message,
    });
  } catch (error) {
    next(error);
  }
};

const endContract = async (req, res, next) => {
  const id = req.body.id;
  const setParams = {
    $set: {
      "subFeedback.stars": req.body.score,
      "subFeedback.feedback": req.body.feedback,
    },
  };
  const message = "Contract End Success";

  try {
    await Application.findOneAndUpdate({ _id: id }, { ...setParams });

    res.status(201).json({
      success: true,
      setParams,
      id,
      message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateJob,
  sendOffer,
  getHiredCandidates,
  getProposals,
  endContract,
};
