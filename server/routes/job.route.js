const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  createJob,
  getJobDetails,
  getAllJobs,
  placeBid,
} = require("../controllers/cJob.js");

router.post("/create", protect, createJob);
router.post("/getJobDetails", protect, getJobDetails);
router.post("/getAllJobs", protect, getAllJobs);
router.post("/placeBid", protect, placeBid);

module.exports = router;
