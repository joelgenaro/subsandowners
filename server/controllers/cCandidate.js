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
  const user = await User.findOne({ _id: owner_id });
  const user_fav_subs = user.fav_subs;
  const isSavedTalent = req.body.isSavedTalent
    ? { $in: user_fav_subs }
    : { $ne: owner_id };
  const query = { _id: { ...isSavedTalent } };

  await fetchData(req, res, next, query);
};

const filter = async (req, res, next) => {
  const filter = req.body.filter || "";
  const owner_id = req.user["_id"];
  const user = await User.findOne({ _id: owner_id });
  const user_fav_subs = user.fav_subs;
  const isSavedTalent = req.body.isSavedTalent
    ? { $in: user_fav_subs }
    : { $ne: owner_id };
  const query = {
    $and: [
      { _id: { ...isSavedTalent } },
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

const updateFav = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const userId = req.body["_id"];
  const is_fav = req.body.is_fav;

  try {
    if (is_fav == true) {
      await User.findOneAndUpdate(filter, { $pull: { fav_subs: userId } });
    } else {
      await User.findOneAndUpdate(filter, { $push: { fav_subs: userId } });
    }

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const removeFav = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const jobId = req.body["_id"];

  console.log(filter);

  try {
    await User.findOneAndUpdate(filter, { $pull: { fav_subs: jobId } });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  filter,
  updateFav,
  removeFav,
};
