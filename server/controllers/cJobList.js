const Project = require("../models/mProject.js");

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

// TextSearch Controller
const getData = async (req, res, next) => {
  const filterOptions = req.body.filterOptions;

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
        $or: [
          { name: { $regex: filterOptions.text, $options: "i" } },
          { location: { $regex: filterOptions.text, $options: "i" } },
          { note: { $regex: filterOptions.text, $options: "i" } },
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
    const data = await Project.paginate(query, options);
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
};
