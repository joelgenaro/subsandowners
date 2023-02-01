const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getData, filter } = require("../controllers/cJobPostings.js");

router.get("/getData", protect, getData);
router.post("/filter", protect, filter);

module.exports = router;
