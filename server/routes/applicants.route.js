const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getJobDetails } = require("../controllers/cJob.js");
const {
  sendOffer,
  updateJob,
  getProposals,
  getHiredCandidates,
  endContract,
} = require("../controllers/cApplicants.js");

router.post("/getJobDetails", protect, getJobDetails);
router.post("/getProposals", protect, getProposals);
router.post("/getHiredCandidates", protect, getHiredCandidates);
router.post("/sendOffer", protect, sendOffer);
router.post("/updateJob", protect, updateJob);
router.post("/endContract", protect, endContract);

module.exports = router;
