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
const proposal = require("./routes/proposal.route.js");
const candidate = require("./routes/candidate.route.js");
const myJobs = require("./routes/myJobs.route.js");
const jobPostings = require("./routes/jobPostings.route.js");
const savedJob = require("./routes/savedJob.route.js");
const applicants = require("./routes/applicants.route.js");
const offer = require("./routes/offer.route.js");
const activeContracts = require("./routes/activeContracts.route.js");
const allContractsForSub = require("./routes/allContractsForSub.route.js");
const scontract = require("./routes/scontract.route.js");
const profile = require("./routes/profile.route.js");
const settings = require("./routes/settings.route.js");

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
app.use(express.json({ limit: 50000000 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/job", job);
app.use("/api/savedJob", savedJob);
app.use("/api/candidate", candidate);
app.use("/api/myJobs", myJobs);
app.use("/api/proposal", proposal);
app.use("/api/jobPostings", jobPostings);
app.use("/api/applicants", applicants);
app.use("/api/offer", offer);
app.use("/api/activeContracts", activeContracts);
app.use("/api/allContractsForSub", allContractsForSub);
app.use("/api/scontract", scontract);
app.use("/api/profile", profile);
app.use("/api/settings", settings);

app.use(errorHandler);

app.use(express.static("../client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

// listen
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
