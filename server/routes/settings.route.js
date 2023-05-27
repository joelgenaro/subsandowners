const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getData, updateEmail } = require("../controllers/cSettings.js");

router.post("/getData", protect, getData);
router.post("/updateEmail", protect, updateEmail);

module.exports = router;
