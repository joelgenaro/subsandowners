const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");

const getData = async (req, res, next) => {
  try {
    const contracts = await Job.find({
      owner_id: req.user["_id"],
      status: "hired",
    });

    res.status(201).json({
      success: true,
      contracts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
};
