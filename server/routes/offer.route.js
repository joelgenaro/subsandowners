const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  getData,
  acceptOffer,
  declineOffer,
} = require("../controllers/cOffer.js");

router.post("/getData", protect, getData);
router.post("/acceptOffer", protect, acceptOffer);
router.post("/declineOffer", protect, declineOffer);

module.exports = router;
