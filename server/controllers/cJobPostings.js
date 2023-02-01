const Job = require("../models/mJob");
const myCustomLabels = require("../utils/paginationLabel");

const getData = async (req, res, next) => {
  const owner_id = req.user["_id"];

  const options = {
    page: req.query.page,
    limit: 5,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  // Query regarding filter options.
  const query = {
    owner_id: { $eq: owner_id },
  };

  try {
    const data = await Job.paginate(query, options);
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

const filter = async (req, res, next) => {
  const filter = req.body.filter;
  const options = {
    page: 1,
    limit: 5,
    customLabels: myCustomLabels,
  };
  const query = {
    $and: [
      { title: { $regex: filter, $options: "i" } },
      { owner_id: { $eq: req.user["_id"] } },
    ],
  };

  try {
    const data = await Job.paginate(query, options);
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

module.exports = {
  getData,
  filter,
};
