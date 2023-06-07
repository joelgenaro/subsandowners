const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  getData,
  updateEmail,
  updateServiceArea,
  reset_password,
} = require("../controllers/cSettings.js");

router.post("/getData", protect, getData);
router.post("/updateEmail", protect, updateEmail);
router.post("/updateServiceArea", protect, updateServiceArea);
router.post("/reset_password", protect, reset_password);

module.exports = router;
