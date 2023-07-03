const Job = require("../models/mJob");

const fetchData = async (req, res, next, query) => {
  try {
    const contracts = await Job.find(query);

    res.status(201).json({
      success: true,
      contracts,
    });
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  const query = {
    owner_id: req.user["_id"],
    $or: [{ status: { $eq: "hired" } }, { status: { $eq: "end" } }],
  };

  await fetchData(req, res, next, query);
};

const filter = async (req, res, next) => {
  const filter = req.body.filter || "";

  const query = {
    owner_id: req.user["_id"],
    $or: [{ status: { $eq: "hired" } }, { status: { $eq: "end" } }],
    title: { $regex: filter, $options: "i" },
  };

  await fetchData(req, res, next, query);
};

module.exports = {
  getData,
  filter,
};
