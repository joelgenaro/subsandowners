const Application = require("../models/mApplication");
const Job = require("../models/mJob");
const User = require("../models/mUser");

const giveFeedback = async (req, res, next) => {
  const currentDate = new Date(Date.now());
  const id = req.body.id;
  const setParams = {
    $set: {
      status: "end",
      date_completed: currentDate,
      "ownerFeedback.stars": req.body.score,
      "ownerFeedback.feedback": req.body.feedback,
    },
  };

  try {
    await Application.findOneAndUpdate({ _id: id }, { ...setParams });

    res.status(201).json({
      success: true,
      setParams,
      id,
    });
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  try {
    const application = await Application.findById(req.body.id);
    const jobInfo = await Job.findOne({ _id: application.jobId });
    const ownerInfo = await getOwnerInfo(jobInfo.owner_id);

    const contractDetails = {
      subFeedback: application.subFeedback,
      ownerFeedback: application.ownerFeedback,
      jobDetails: {
        title: jobInfo.title,
        materialCategory: jobInfo.materialCategory,
        startedDate: application.date_started,
        description: jobInfo.description,
        originalJobPostings: jobInfo._id,
      },
      ownerInfo: { ...ownerInfo },
    };

    res.status(201).json({
      success: true,
      contractDetails,
    });
  } catch (error) {
    next(error);
  }
};

const getOwnerInfo = async (id) => {
  let feedback = 0;
  let feedbackCount = 0;
  let jobsPosted = 0;
  let jobsHired = 0;
  let openJobs = 0;
  let candidatesHired = 0;
  let candidatesActiviated = 0;
  let totalSpent = 0;

  const userInfo = await User.findOne({ _id: id });
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
    // count jobs posted
    jobsPosted = i + 1;
    // count jobs hired
    if (job.status == "hired" || job.status == "end") jobsHired++;
    // count jobs opened
    if (job.status == "open" || job.status == "interviewing") openJobs++;

    job.applications.map((application, a) => {
      // feedback
      if (application.ownerFeedback.stars != 0) feedbackCount++;
      feedback += Number(application.ownerFeedback.stars);

      // count candidates hired
      if (
        application.status == "hired" ||
        application.status == "requestFeedback" ||
        application.status == "end"
      )
        candidatesHired++;

      // count candidates activiated
      if (application.status == "hired") candidatesActiviated++;

      // totalspent
      if (application.status == "end")
        totalSpent += Number(application.bidAmount);
    });
  });

  return (ownerInfo = {
    name: userInfo.first_name + " " + userInfo.last_name,
    avatar: userInfo.avatar,
    country: userInfo.country,
    city: userInfo.city,
    memberSince: userInfo.join_date,
    feedback: feedback / feedbackCount,
    jobsPosted: {
      JobsPosted: jobsPosted,
      hireRate: Math.trunc((jobsHired / jobsPosted) * 100),
      openJobs: openJobs,
    },
    totalSpent: {
      totalSpent: totalSpent,
      hires: candidatesHired,
      active: candidatesActiviated,
    },
  });
};

module.exports = {
  getData,
  giveFeedback,
  getOwnerInfo,
};
