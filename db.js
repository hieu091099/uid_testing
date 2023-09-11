const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const database = process.env.DB;

// const connectionString = `mongodb://${user}:${password}@${host}:${port}/${database}`;

const connectionString = `mongodb://localhost:27017/railway`;

const connectToDatabase = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;
