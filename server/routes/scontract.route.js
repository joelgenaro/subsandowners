const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getData, giveFeedback } = require("../controllers/cScontract.js");

router.post("/getData", protect, getData);
router.post("/giveFeedback", protect, giveFeedback);

module.exports = router;
