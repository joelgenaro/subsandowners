const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configDatabase = require("./config/database.js");
const { errorHandler } = require("./middlewares/error");
const bodyParser = require("body-parser");
const path = require("path");

// routes
const auth = require("./routes/auth.route.js");
const job = require("./routes/job.route.js");
const candidate = require("./routes/candidate.route.js");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//connecting to the mongodb database
configDatabase();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/job", job);
app.use("/api/candidate", candidate);

app.use(errorHandler);

app.use(express.static("../client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

// listen
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
