const Project = require("../models/mProject.js");

// CreateProjectController
createProject = async (req, res, next) => {
  let data = {
    ...req.body,
    owner: req.user["_id"],
    attachments: req.fileInArray,
  };

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

module.exports = {
  createProject,
};
