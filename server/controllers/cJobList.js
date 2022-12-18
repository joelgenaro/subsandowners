const Project = require("../models/mProject.js");

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

exports.getData = async (req, res) => {
  const options = {
    page: req.query.page,
    limit: req.query.size,
    customLabels: myCustomLabels,
  };
  Project.paginate({}, options)
    .then((data) => {
      res.send({
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error",
        error: err.message,
      });
    });
};

exports.filter = (req, res) => {
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

  Project.paginate(query, options)
    .then((data) => {
      console.log(data);
      res.send({
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "error",
        error: err.message,
      });
    });
};
