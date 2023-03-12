const User = require("../models/mUser");
const Job = require("../models/mJob");
const myCustomLabels = require("../utils/paginationLabel");

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, owner_id: req.user["_id"] });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getJobDetails = async (req, res, next) => {
  try {
    const details = await Job.findById(req.body.id).exec();

    res.status(201).json({
      success: true,
      details,
    });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  const filterOptions = req.body.filterOptions;
  const owner_id = req.user["_id"];

  const options = {
    page: req.body.page,
    limit: req.body.size,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  const query = {
    $and: [
      {
        owner_id: { $ne: owner_id },
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
    const user = await User.findOne({ _id: owner_id });
    const data = await Job.paginate(query, options);

    const itemsList = data.itemsList;
    const paginator = data.paginator;
    const fav_jobs = user.fav_jobs ? user.fav_jobs : [];

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
      fav_jobs,
    });
  } catch (error) {
    next(error);
  }
};

const updateFav = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const jobId = req.body["_id"];
  const is_fav = req.body.is_fav;

  try {
    if (is_fav == true) {
      await User.findOneAndUpdate(filter, { $pull: { fav_jobs: jobId } });
    } else {
      await User.findOneAndUpdate(filter, { $push: { fav_jobs: jobId } });
    }

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getJobDetails,
  getAllJobs,
  updateFav,
};
