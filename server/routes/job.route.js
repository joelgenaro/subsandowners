const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  createJob,
  getJobDetails,
  getAllJobs,
  updateFav,
} = require("../controllers/cJob.js");

router.post("/create", protect, createJob);
router.post("/getJobDetails", protect, getJobDetails);
router.post("/getAllJobs", protect, getAllJobs);
router.post("/updateFavOfDB", protect, updateFav);

module.exports = router;
