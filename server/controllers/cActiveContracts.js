const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");

const getData = async (req, res, next) => {
  try {
    const applications = await Application.find({
      candidateId: req.user["_id"],
      status: "hired",
    });

    const promises = applications.map((item) => migrationJobAndUser(item));
    const contracts = await Promise.all(promises);

    res.status(201).json({
      success: true,
      contracts,
    });
  } catch (error) {
    next(error);
  }
};

const migrationJobAndUser = async (item) => {
  const jobInfo = await Job.findOne({ _id: item.jobId });
  const userInfo = await User.findOne({ _id: item.candidateId });

  return (contract = {
    jobName: jobInfo.title,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    budget: jobInfo.budget,
    date_updated: item.date_updated,
    date_created: item.date_created,
  });
};

module.exports = {
  getData,
};
