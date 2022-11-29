const express = require("express");

const router = express.Router();

// fileuploader

const {
  createSubcontractorWithEmail,
  updateSubcontractor,
} = require("../controllers/cAuthSubcontractor.js");

router.post("/add", createSubcontractorWithEmail);

router.post("/update", updateSubcontractor);

module.exports = router;
