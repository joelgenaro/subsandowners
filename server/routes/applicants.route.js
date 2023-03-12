const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getJobDetails } = require("../controllers/cJob.js");
const {
  updateJob,
  getProposals,
  sendOffer,
} = require("../controllers/cApplicants.js");

router.post("/getJobDetails", protect, getJobDetails);
router.post("/getProposals", protect, getProposals);
router.post("/updateJob", protect, updateJob);
router.post("/sendOffer", protect, sendOffer);

module.exports = router;
