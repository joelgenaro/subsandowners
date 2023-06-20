const Job = require("../models/mJob");
const Application = require("../models/mApplication");
const myCustomLabels = require("../utils/paginationLabel");

const queryDB = async (options, query) => {
  const data = await Job.paginate(query, options);

  const itemsListToCountProposals = data.itemsList;
  const paginator = data.paginator;
  const promises = itemsListToCountProposals.map((item) => getStatus(item));

  const itemsList = await Promise.all(promises);

  return { itemsList, paginator };
};

const getData = async (req, res, next) => {
  const options = {
    page: req.query.page,
    limit: 15,
    customLabels: myCustomLabels,
  };

  const query = {
    $and: [
      { owner_id: { $eq: req.user["_id"] } },
      {
        $or: [{ status: { $ne: "closed" } }, { status: { $ne: "end" } }],
      },
    ],
  };

  try {
    const { itemsList, paginator } = await queryDB(options, query);

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
    });
  } catch (error) {
    next(error);
  }
};

const getStatus = async (item) => {
  const applications = await Application.find({ jobId: item._id });
  let messaged = 0;
  let hired = 0;

  applications.map((item) => {
    if (item.status === "interviewing") {
      ++messaged;
    }
    if (
      item.status === "hired" ||
      item.status === "end" ||
      item.status === "requestFeedback"
    ) {
      ++hired;
    }
  });

  return {
    ...item._doc,
    proposals: applications.length,
    messaged: messaged,
    hired: hired,
  };
};

const filter = async (req, res, next) => {
  const options = {
    page: 1,
    limit: 15,
    customLabels: myCustomLabels,
  };

  const query = {
    $and: [
      { title: { $regex: req.body.filter, $options: "i" } },
      { owner_id: { $eq: req.user["_id"] } },
      {
        $or: [{ status: { $ne: "closed" } }, { status: { $ne: "end" } }],
      },
    ],
  };

  try {
    const { itemsList, paginator } = await queryDB(options, query);

    res.status(201).json({
      success: true,
      itemsList,
      paginator,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const ID_Delete = req.body.id;
  const message = "Project Remove Success";

  try {
    await Application.updateMany(
      ({ jobId: ID_Delete }, { $set: { status: "closed" } })
    );

    await Job.deleteOne({ _id: ID_Delete });

    res.status(201).json({
      success: true,
      ID_Delete,
      message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  filter,
  deleteJob,
};
