const mongoose = require("mongoose");

require("dotenv").config();

const dbURL = process.env.MONGO_DB_URL;
mongoose.set("strictQuery", false);

const configDatabase = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    res.send("Database connected");
  } catch (err) {
    res.send(err);

    process.exit(1);
  }
};

module.exports = configDatabase;
