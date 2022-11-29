const express = require("express");
const cors = require("cors");
const configDatabase = require("./config/database.js");

// middlewares
// let authentication = require("./middlewares/authentication");
// routes
const authSubcontractor = require("./routes/authSubcontractor.route.js");
const authOwner = require("./routes/authOwner.route.js");
const jobPost = require("./routes/jobPost.route.js");
const candidate = require("./routes/candidate.route.js");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//connecting to the mongodb database
configDatabase();

app.use(cors({ origin: true, credentials: true }));

// add the middlewares
app.use(express.json({ extended: false }));
app.get("/", (req, res) =>
  res.send("Hello there!! Cheers !! The server is up and running")
);

// using routes
app.use("/api/authSubcontractor", authSubcontractor);
app.use("/api/authOwner", authOwner);
app.use("/api/jobPost", jobPost);
app.use("/api/candidate", candidate);

// listen
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
