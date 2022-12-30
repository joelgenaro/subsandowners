const Subcontractor = require("../models/mSubcontractors.js");

// paginator lables
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

const getData = async (req, res, next) => {
  const options = {
    page: req.query.page,
    limit: req.query.size,
    customLabels: myCustomLabels,
    allowDiskUse: true,
  };

  try {
    const data = await Subcontractor.paginate({}, options);
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

const filter = async (req, res, next) => {
  const filter = req.body.filter;
  const options = {
    page: 1,
    limit: req.body.size,
    customLabels: myCustomLabels,
  };
  const query = {
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
      { salary: { $regex: filter, $options: "i" } },
      { location: { $regex: filter, $options: "i" } },
    ],
  };

  try {
    const data = await Subcontractor.paginate(query, options);
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

module.exports = {
  getData,
  filter,
};
