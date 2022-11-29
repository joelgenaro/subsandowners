const express = require("express");
const router = express.Router();

// file upload
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  cb(null, true);
};

let upload = multer({ storage, fileFilter });

const { createJob } = require("../controllers/cJobPost.js");

router.post("/add", upload.single("attachments"), createJob);

module.exports = router;
