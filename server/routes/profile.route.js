const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const { getProfile } = require("../controllers/cProfile.js");

router.post("/getProfile", protect, getProfile);

module.exports = router;
