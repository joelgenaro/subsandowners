const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const {
  login,
  create,
  update,
  logout,
  forgotPassword,
} = require("../controllers/cAuth.js");

router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/add", create);
router.post("/update", protect, update);
router.get("/logout", logout);

module.exports = router;
