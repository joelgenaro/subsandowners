const Application = require("../models/mApplication");

const placeBid = async (req, res, next) => {
  try {
    const proposal = { ...req.body };
    let message = "";

    const isEdit = await Application.find({
      jobId: req.body.jobId,
      candidateId: req.user["_id"],
    });

    if (!isEdit || isEdit.length == 0) {
      await Application.create({
        candidateId: req.user["_id"],
        ...req.body,
      });

      message = "You have successfully placed a your bid";
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
      message = "You have successfully edited a your bid";
    }

    res.status(201).json({
      success: true,
      proposal,
      message,
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
    const message = "Bid Retract Success";

    await Application.findOneAndDelete({
      jobId: req.body.id,
      candidateId: req.user["_id"],
    });

    res.status(201).json({
      success: true,
      message,
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
