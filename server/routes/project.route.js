const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { createProject, getJobDetails } = require("../controllers/cProject.js");

router.post("/create", protect,  createProject);
router.post("/getJobDetails", protect, getJobDetails);

module.exports = router;
