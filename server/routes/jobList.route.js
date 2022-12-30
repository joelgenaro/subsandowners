const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

// fileuploader

const { getData } = require("../controllers/cJobList.js");

router.post(`/getData`, protect, getData);

module.exports = router;
