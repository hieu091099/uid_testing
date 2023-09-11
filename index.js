const express = require("express");
const mongoose = require("mongoose");
const connectToDatabase = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();

// create app
const app = express();
app.use(bodyParser.json({ extended: true }));

// connect mongodb
connectToDatabase()
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.error("connect fail:", error);
  });

// define routes
app.get("/", (req, res) => {
  res.json("Hi there");
});
app.use("/api/products", require("./routes/product.route"));

app.use(function (req, res, next) {
  res.status(500).json({
    error_message: "Endpoint not found!",
  });
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    error_message: "Something broke!",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
