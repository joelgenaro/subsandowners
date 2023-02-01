const User = require("../models/mUser");
const Job = require("../models/mJob");

const placeBid = async (req, res, next) => {
  const filter = { _id: req.user["_id"] };
  const jobFilter = { _id: req.body.jobId };
  const proposalForJob = {
    userId: req.user["_id"],
  };
  const proposal = { ...req.body };

  try {
    const isEdit = await User.find({
      proposals: { $elemMatch: { jobId: req.body.jobId } },
    });

    if (!isEdit || isEdit.length > 0) {
      await User.updateOne(
        { _id: req.user["_id"] },
        { $set: { "proposals.$[element]": { ...req.body } } },
        { arrayFilters: [{ "element.jobId": req.body.jobId }] }
      );
    } else {
      await User.findOneAndUpdate(filter, {
        $push: { proposals: proposal },
      });
      await Job.findOneAndUpdate(jobFilter, {
        $push: { proposals: { ...proposalForJob } },
      });
    }

    res.status(201).json({
      success: true,
      proposal,
    });
  } catch (error) {
    next(error);
  }
};

const getProposal = async (req, res, next) => {
  const jobId = req.body.id;

  try {
    const userWithProposal = await User.find({
      proposals: { $elemMatch: { jobId: jobId } },
    });

    const isExistProposal =
      userWithProposal.length > 0 ? userWithProposal[0].proposals[0] : null;

    res.status(201).json({
      success: true,
      isExistProposal,
    });
  } catch (error) {
    next(error);
  }
};

const retract = async (req, res, next) => {
  const ownerId = req.user["_id"];
  const jobId = req.body.id;

  try {
    await User.updateOne(
      { _id: ownerId },
      { $pull: { proposals: { jobId: jobId } } }
    );

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const myProposal = async (req, res, next) => {
  let proposals = null;
  const id = req.user["_id"];

  try {
    const jobIds = await User.findById(id);

    proposals =
      jobIds.proposals && jobIds.proposals.length > 0 ? jobIds.proposals : null;

    res.status(201).json({
      success: true,
      proposals,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeBid,
  getProposal,
  retract,
  myProposal,
};
