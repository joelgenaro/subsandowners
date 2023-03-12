const Job = require("../models/mJob");
const myCustomLabels = require("../utils/paginationLabel");

const getData = async (req, res, next) => {
  const options = {
    page: req.query.page,
    limit: 5,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  const query = {
    owner_id: { $eq: req.user["_id"] },
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
  const options = {
    page: 1,
    limit: 5,
    customLabels: myCustomLabels,
  };

  const query = {
    $and: [
      { title: { $regex: req.body.filter, $options: "i" } },
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
