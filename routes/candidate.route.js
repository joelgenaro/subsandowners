const express = require("express");

const router = express.Router();

// fileuploader

const { getData, filter } = require("../controllers/cCandidate.js");

router.get(`/getData`, getData);
router.post(`/filter`, filter);

module.exports = router;
