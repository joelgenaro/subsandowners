const User = require("../models/mUser");
const myCustomLabels = require("../utils/paginationLabel");

const getData = async (req, res, next) => {
  const owner_id = req.user["_id"];
  const options = {
    page: req.query.page,
    limit: req.query.size,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };
  const query = {
    _id: { $ne: owner_id },
  };

  try {
    const data = await User.paginate(query, options);
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
    limit: req.body.size,
    customLabels: myCustomLabels,
  };
  const query = {
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
      { salary: { $regex: filter, $options: "i" } },
      { location: { $regex: filter, $options: "i" } },
    ],
  };

  try {
    const data = await User.paginate(query, options);
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
