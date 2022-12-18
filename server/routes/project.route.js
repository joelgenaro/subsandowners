const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fileInArray = [];

//image upload func

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let filePath = [];
    let uniqueId = uuidv4();

    const ext = path.extname(file.originalname);
    filePath = `${uniqueId}${ext}`;
    fileInArray.push([filePath]);

    cb(null, filePath);

    req.fileInArray = fileInArray;
  },
});

const upload = multer({
  storage: storage,
});

const { createProject } = require("../controllers/cProject.js");

router.post("/create", protect, upload.array("attachments", 12), createProject);

module.exports = router;
