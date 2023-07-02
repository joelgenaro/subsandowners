const User = require("../models/mUser");
const Job = require("../models/mJob");
const Application = require("../models/mApplication");
const myCustomLabels = require("../utils/paginationLabel");

const fetchData = async (req, res, next, filter) => {
  try {
    const owner_id = req.user["_id"];
    const jobIds = await Job.find(
      { status: "hired", owner_id: req.user["_id"] },
      { _id: 1 }
    );
    const candidateIds = await Application.find(
      { status: "hired", jobId: { $in: [...jobIds] } },
      { candidateId: 1 }
    );
    const userIds = candidateIds.map((item) => item.candidateId);
    const query = {
      _id: { $in: userIds },
      ...(filter && {
        $or: [
          { first_name: { $regex: filter, $options: "i" } },
          { last_name: { $regex: filter, $options: "i" } },
          { city: { $regex: filter, $options: "i" } },
        ],
      }),
    };

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
  await fetchData(req, res, next, null);
};

const filter = async (req, res, next) => {
  const filter = req.body.filter || "";

  await fetchData(req, res, next, filter);
};

module.exports = {
  getData,
  filter,
};
