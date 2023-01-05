const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { createProject, getJobDetails } = require("../controllers/cProject.js");

router.post("/create", protect, upload.array("attachments", 25), createProject);
router.post("/getJobDetails", protect, getJobDetails);

module.exports = router;
