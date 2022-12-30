const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { createProject } = require("../controllers/cProject.js");

router.post("/create", protect, upload.array("attachments", 25), createProject);

module.exports = router;
