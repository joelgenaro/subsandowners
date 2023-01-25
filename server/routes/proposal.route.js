const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  getProposal,
  placeBid,
  retract,
} = require("../controllers/cProposal.js");

router.post("/getProposal", protect, getProposal);
router.post("/placeBid", protect, placeBid);

router.post("/retract", protect, retract);
module.exports = router;
