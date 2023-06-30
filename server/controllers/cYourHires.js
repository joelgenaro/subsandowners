const User = require("../models/mUser");
const myCustomLabels = require("../utils/paginationLabel");

const getData = async (req, res, next) => {
  try {
    const owner_id = req.user["_id"];
    const options = {
      page: req.body.page,
      limit: req.body.size,
      customLabels: myCustomLabels,
      allowDiskUse: true,
    };
    const user = await User.findOne({ _id: owner_id });
    const query = { _id: { $ne: owner_id } };
    const data = await User.paginate(query, options);
    const itemsList = data.itemsList;
    const paginator = data.paginator;
    const fav_subs = user.fav_subs ? user.fav_subs : [];

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
      fav_subs,
    });
  } catch (error) {
    next(error);
  }
};

const filter = async (req, res, next) => {
  try {
    const filter = req.body.filter ? req.body.filter : "";
    const owner_id = req.user["_id"];
    const options = {
      page: 1,
      limit: req.body.size,
      customLabels: myCustomLabels,
    };
    const user = await User.findOne({ _id: owner_id });
    const query = {
      $and: [
        {
          _id: { $ne: owner_id },
        },
        {
          $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } },
            { city: { $regex: filter, $options: "i" } },
          ],
        },
      ],
    };
    const data = await User.paginate(query, options);
    const itemsList = data.itemsList;
    const paginator = data.paginator;
    const fav_subs = user.fav_subs ? user.fav_subs : [];

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
      fav_subs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  filter,
};
