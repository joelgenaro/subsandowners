const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getData } = require("../controllers/cSavedJob.js");
const { removeFav } = require("../controllers/cSavedJob.js");

router.post("/getData", protect, getData);
router.post("/removeFav", protect, removeFav);

module.exports = router;
