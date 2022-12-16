const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

// fileuploader

const { getData, filter } = require("../controllers/cCandidate.js");

router.get(`/getData`, protect, getData);
router.post(`/filter`, protect, filter);

module.exports = router;
