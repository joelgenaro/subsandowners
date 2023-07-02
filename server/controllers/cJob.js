const User = require("../models/mUser");
const Job = require("../models/mJob");
const Application = require("../models/mApplication");
const { sendMatchedJobToContractors } = require("./cNotification.js");
const myCustomLabels = require("../utils/paginationLabel");
const { getOwnerInfo } = require("./cScontract.js");

const createJob = async (req, res, next) => {
  try {
    const { _id } = await Job.create({
      ...req.body,
      owner_id: req.user["_id"],
    });

    sendMatchedJobToContractors(req.body, _id);

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
    const ownerInfo = await getOwnerInfo(details.owner_id);

    res.status(201).json({
      success: true,
      details,
      ownerInfo,
    });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  const owner_id = req.user["_id"];
  const filterOptions = req.body.filterOptions;
  const services = req.body.filterOptions.service.map((item) => item.label);

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
        status: { $ne: "end" },
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
        ...(filterOptions.service.length > 0 && {
          service: { $in: services },
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

    const itemsListToCountProposals = data.itemsList;
    const paginator = data.paginator;
    const fav_jobs = user.fav_jobs ? user.fav_jobs : [];

    const promises = itemsListToCountProposals.map((item) =>
      countProposals(item)
    );
    const itemsList = await Promise.all(promises);

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

const countProposals = async (item) => {
  const proposals = await Application.find({ jobId: item._id });
  const ownerInfo = await getOwnerInfo(item.owner_id);

  return {
    ...item._doc,
    proposals: proposals.length,
    feedback: ownerInfo.feedback,
    totalSpent: ownerInfo.totalSpent.totalSpent,
  };
};

const updateFav = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const jobId = req.body["_id"];
  const is_fav = req.body.is_fav;
  const update = is_fav
    ? { $pull: { fav_jobs: jobId } }
    : { $push: { fav_jobs: jobId } };

  try {
    await User.findOneAndUpdate(filter, update);

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
