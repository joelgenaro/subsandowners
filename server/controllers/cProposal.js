const Application = require("../models/mApplication");

const placeBid = async (req, res, next) => {
  try {
    const proposal = { ...req.body };

    const isEdit = await Application.find({
      jobId: req.body.jobId,
      candidateId: req.user["_id"],
    });

    if (!isEdit || isEdit.length == 0) {
      await Application.create({
        candidateId: req.user["_id"],
        ...req.body,
      });
    } else {
      await Application.findOneAndUpdate(
        {
          jobId: req.body.jobId,
          candidateId: req.user["_id"],
        },
        {
          bidAmount: req.body.bidAmount,
          deliveryDate: req.body.deliveryDate,
          proposal: req.body.proposal,
        }
      );
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
  try {
    const userWithProposal = await Application.find({
      jobId: req.body.id,
      candidateId: req.user["_id"],
    });

    const isExistProposal =
      userWithProposal.length > 0 ? userWithProposal[0] : null;

    res.status(201).json({
      success: true,
      isExistProposal,
    });
  } catch (error) {
    next(error);
  }
};

const retract = async (req, res, next) => {
  try {
    await Application.findOneAndDelete({
      jobId: req.body.id,
      candidateId: req.user["_id"],
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const myProposal = async (req, res, next) => {
  try {
    const submittedProposals = await Application.find({
      candidateId: req.user["_id"],
      status: { $eq: "open" },
    });

    const offers = await Application.find({
      candidateId: req.user["_id"],
      status: { $eq: "sendOffer" },
    });

    res.status(201).json({
      success: true,
      submittedProposals,
      offers,
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
