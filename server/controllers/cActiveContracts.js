const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");

const migrateJobAndUser = async (item) => {
  const jobInfo = await Job.findOne({ _id: item.jobId });
  const userInfo = await User.findOne({ _id: jobInfo.owner_id });

  return {
    ID_Application: item._id,
    jobName: jobInfo.title,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    budget: jobInfo.budget,
    date_updated: item.date_updated,
    date_created: item.date_created,
  };
};

const getContracts = async (req, res, next, filter) => {
  try {
    const applications = await Application.find({
      candidateId: req.user["_id"],
      status: { $eq: "hired" },
      ...(filter && { jobTitle: { $regex: filter, $options: "i" } }),
    });
    const promises = applications.map((item) => migrateJobAndUser(item));
    const contracts = await Promise.all(promises);

    res.status(201).json({
      success: true,
      contracts,
    });
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  await getContracts(req, res, next, null);
};

const filter = async (req, res, next) => {
  const filterValue = req.body.filter;
  await getContracts(req, res, next, filterValue);
};

module.exports = {
  getData,
  filter,
  migrateJobAndUser,
};
