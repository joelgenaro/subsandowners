const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  getData,
  updateFav,
  filter,
  removeFav,
} = require("../controllers/cCandidate.js");

router.post(`/getData`, protect, getData);
router.post(`/filter`, protect, filter);
router.post(`/removeFav`, protect, removeFav);
router.post("/updateFavOfDB", protect, updateFav);

module.exports = router;
