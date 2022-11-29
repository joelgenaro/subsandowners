const express = require("express");

const router = express.Router();

const {
  createOwnerWithEmail,
  updateOwner,
} = require("../controllers/cAuthOwner.js");

router.post("/add", createOwnerWithEmail);

router.post("/update", updateOwner);

module.exports = router;
