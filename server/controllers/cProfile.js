const Application = require("../models/mApplication");
const User = require("../models/mUser");
const Job = require("../models/mJob");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user["_id"];
    const profile = await User.findOne({ _id: userId });
    console.log(userId, profile);
    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

const getSubFeedback = async (id) => {
  let feedback = 0;
  let feedbackCount = 0;

  const joins = await Job.aggregate([
    {
      $lookup: {
        from: "application",
        localField: "_id",
        foreignField: "jobId",
        as: "applications",
      },
    },
  ]);

  joins.map((job, i) => {
    job.applications.map((application, a) => {
      if (application.subFeedback.stars != 0) feedbackCount++;
      feedback += Number(application.subFeedback.stars);
    });
  });

  return { feedback: feedback / feedbackCount };
};

module.exports = {
  getProfile,
  getSubFeedback,
};
