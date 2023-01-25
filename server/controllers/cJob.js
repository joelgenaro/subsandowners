const User = require("../models/mUser");
const Job = require("../models/mJob");

// Paginator lables
const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

const createJob = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const data = {
    ...req.body,
    owner_id: req.user["_id"],
  };

  try {
    await Job.create({ ...data });

    await User.findOneAndUpdate(filter, {
      $push: { jobs: { ...req.body } },
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getJobDetails = async (req, res, next) => {
  const jobId = req.body.id;

  try {
    const details = await Job.findById(jobId).exec();

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
  // Query regarding filter options.
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

const placeBid = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };

  try {
    await User.findOneAndUpdate(filter, {
      $push: { proposals: { ...req.body } },
    });

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
  placeBid,
};
