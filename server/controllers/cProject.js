const Project = require("../models/mProject.js");

// CreateProjectController
createProject = async (req, res, next) => {
  let data = {
    ...req.body,
    owner: req.user["_id"],
  };

  console.log(req.body);

  try {
    const user = await Project.create({
      ...data,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

getJobDetails = async (req, res, next) => {
  const projectId = req.body.id;

  try {
    const details = await Project.findById(projectId).exec();

    res.status(201).json({
      success: true,
      details,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getJobDetails,
};
