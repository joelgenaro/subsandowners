const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  createOwnerWithEmail,
  updateOwner,
  logout,
} = require("../controllers/cAuthOwner.js");

router.post("/add", createOwnerWithEmail);
router.post("/update", protect, updateOwner);
router.get("/logout", logout);

module.exports = router;
