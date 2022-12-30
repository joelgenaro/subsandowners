const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fileInArray = [];

// FileUpload Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
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

module.exports = upload;
