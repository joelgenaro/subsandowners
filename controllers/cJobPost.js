const Project = require("../models/mProject.js");

exports.createJob = (req, res) => {
  console.log(req.body);

  // Project.create(req.body)
  //   .then((job) => {
  //     res.json({
  //       message: "created!",
  //       job,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(404).json({
  //       message: "error",
  //       error: err.message,
  //     });
  //   });
};
