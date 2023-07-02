const Job = require("../models/mJob");
const Application = require("../models/mApplication");
const myCustomLabels = require("../utils/paginationLabel");

const queryDB = async (req, res, next, query) => {
  const options = {
    page: req.query.page || 1,
    limit: 15,
    customLabels: myCustomLabels,
  };

  try {
    const data = await Job.paginate(query, options);

    const itemsListToCountProposals = data.itemsList;
    const paginator = data.paginator;
    const promises = itemsListToCountProposals.map((item) => getStatus(item));

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

const getData = async (req, res, next) => {
  const query = {
    $and: [
      { owner_id: { $eq: req.user["_id"] } },
      {
        status: { $ne: "end" },
      },
    ],
  };

  await queryDB(req, res, next, query);
};

const filter = async (req, res, next) => {
  const query = {
    $and: [
      { title: { $regex: req.body.filter, $options: "i" } },
      { owner_id: { $eq: req.user["_id"] } },
      {
        status: { $ne: "end" },
      },
    ],
  };

  await queryDB(req, res, next, query);
};

const getStatus = async (item) => {
  const applications = await Application.find({ jobId: item._id });
  let messaged = 0;
  let hired = 0;
  let proposals = 0;

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
    } else {
      ++proposals;
    }
  });

  return {
    ...item._doc,
    proposals: proposals,
    messaged: messaged,
    hired: hired,
  };
};

const deleteJob = async (req, res, next) => {
  const currentDate = new Date(Date.now());
  const ID_Delete = req.body.id;
  const message = "Project End Success";

  try {
    await Application.updateMany(
      ({ jobId: ID_Delete }, { $set: { status: "end" } })
    );
    await Job.updateOne(
      ({ _id: ID_Delete }, { $set: { status: "end", date_end: currentDate } })
    );

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
