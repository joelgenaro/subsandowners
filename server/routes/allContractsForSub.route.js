const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getData, filter } = require("../controllers/cAllContractsForSub.js");

router.post("/getData", protect, getData);
router.post("/filter", protect, filter);

module.exports = router;
