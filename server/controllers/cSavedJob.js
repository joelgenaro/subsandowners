const User = require("../models/mUser");
const Job = require("../models/mJob");
const Application = require("../models/mApplication");
const myCustomLabels = require("../utils/paginationLabel");
const { countProposals } = require("./cJob");

const getData = async (req, res, next) => {
  const filterOptions = req.body.filterOptions;

  const user = await User.findOne({ _id: req.user["_id"] });

  const options = {
    page: req.body.page,
    limit: req.body.size,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  const query = {
    $and: [
      { status: { $ne: "end" } },
      {
        _id: { $in: user.fav_jobs },
      },
      {
        $or: [
          { title: { $regex: filterOptions.text, $options: "i" } },
          { location: { $regex: filterOptions.text, $options: "i" } },
          { description: { $regex: filterOptions.text, $options: "i" } },
          { deadline: { $regex: filterOptions.text, $options: "i" } },
          { materialCategory: { $regex: filterOptions.text, $options: "i" } },
          { materialStyle: { $regex: filterOptions.text, $options: "i" } },
          { materialColor: { $regex: filterOptions.text, $options: "i" } },
          { materialHeight: { $regex: filterOptions.text, $options: "i" } },
          { removalCategory: { $regex: filterOptions.text, $options: "i" } },
          { removalAmount: { $regex: filterOptions.text, $options: "i" } },
        ],
      },
      {
        ...(filterOptions.location && {
          location: { $regex: filterOptions.location, $options: "i" },
        }),
      },
      {
        ...(filterOptions.minPrice && {
          budget: { $gte: filterOptions.minPrice },
        }),
      },
      {
        ...(filterOptions.maxPrice && {
          budget: { $lte: filterOptions.maxPrice },
        }),
      },
      {
        ...(filterOptions.category.length > 0 && {
          materialCategory: { $in: filterOptions.category },
        }),
      },
      {
        ...(filterOptions.isRemoval == "removalYes" && {
          removalCategory: { $ne: "" },
        }),
        ...(filterOptions.isRemoval == "removalNo" && { removalCategory: "" }),
      },
    ],
  };

  try {
    const data = await Job.paginate(query, options);

    const paginator = data.paginator;
    const itemsListToCountProposals = data.itemsList;
    const promises = itemsListToCountProposals.map((item) =>
      countProposals(item)
    );
    const itemsList = await Promise.all(promises);

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
    });
  } catch (error) {
    next(error);
  }
};

const removeFav = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const jobId = req.body["_id"];

  try {
    await User.findOneAndUpdate(filter, { $pull: { fav_jobs: jobId } });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getData, removeFav };
