const User = require("../models/mUser");
const myCustomLabels = require("../utils/paginationLabel");

const fetchData = async (req, res, next, query) => {
  try {
    const owner_id = req.user["_id"];

    const options = {
      page: req.body.page || 1,
      limit: req.body.size,
      customLabels: myCustomLabels,
      allowDiskUse: true,
    };

    const user = await User.findOne({ _id: owner_id });
    const data = await User.paginate(query, options);

    const itemsList = data.itemsList;
    const paginator = data.paginator;
    const fav_subs = user.fav_subs || [];

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

const getData = async (req, res, next) => {
  const owner_id = req.user["_id"];
  const query = { _id: { $ne: owner_id } };

  await fetchData(req, res, next, query);
};

const filter = async (req, res, next) => {
  const filter = req.body.filter || "";
  const owner_id = req.user["_id"];

  const query = {
    $and: [
      { _id: { $ne: owner_id } },
      {
        $or: [
          { first_name: { $regex: filter, $options: "i" } },
          { last_name: { $regex: filter, $options: "i" } },
          { city: { $regex: filter, $options: "i" } },
        ],
      },
    ],
  };

  await fetchData(req, res, next, query);
};

module.exports = {
  getData,
  filter,
};
