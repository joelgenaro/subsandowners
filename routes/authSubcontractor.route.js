const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  login,
  createSubcontractorWithEmail,
  updateSubcontractor,
  logout,
  forgotPassword,
} = require("../controllers/cAuthSubcontractor.js");

router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/add", createSubcontractorWithEmail);
router.post("/update", protect, updateSubcontractor);
router.get("/logout", logout);

module.exports = router;
