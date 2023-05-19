const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");
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
    page: req.body.page,
    limit: 10,
    customLabels: myCustomLabels,
  };
  const type = req.body.type;
  const jobId = req.body.id;

  let query = null;

  query = {
    jobId: { $eq: jobId },
    $or: [
      { status: { $eq: "open" } },
      { status: { $eq: "sendOffer" } },
      { status: { $eq: "interviewing" } },
    ],
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

const getHiredCandidates = async (req, res, next) => {
  const options = {
    page: req.body.page,
    limit: 10,
    customLabels: myCustomLabels,
  };
  const type = req.body.type;
  const jobId = req.body.id;

  let query = null;

  query = {
    jobId: { $eq: jobId },
    $or: [
      { status: { $eq: "hired" } },
      { status: { $eq: "end" } },
      { status: { $eq: "requestFeedback" } },
    ],
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

  try {
    await Job.findOneAndUpdate({ _id: jobId }, { status: "interviewing" });

    await Application.findOneAndUpdate(
      { jobId: jobId, candidateId: candidateId },
      { status: "sendOffer" }
    );

    res.status(201).json({
      success: true,
      candidateId,
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

  try {
    await Application.findOneAndUpdate({ _id: id }, { ...setParams });

    res.status(201).json({
      success: true,
      setParams,
      id,
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
