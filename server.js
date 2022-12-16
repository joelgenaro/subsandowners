const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configDatabase = require("./config/database.js");
const { errorHandler } = require("./middlewares/error");

// routes
const authSubcontractor = require("./routes/authSubcontractor.route.js");
const authOwner = require("./routes/authOwner.route.js");
const project = require("./routes/project.route.js");
const candidate = require("./routes/candidate.route.js");
const jobList = require("./routes/jobList.route.js");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//connecting to the mongodb database
configDatabase();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./uploads"));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Welcome Subsandowners!"));
app.use("/api/authSubcontractor", authSubcontractor);
app.use("/api/authOwner", authOwner);
app.use("/api/project", project);
app.use("/api/candidate", candidate);
app.use("/api/jobList", jobList);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
// listen
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
