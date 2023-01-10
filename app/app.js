const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const errorMiddleware = require("../middleware/eror");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use(express.json());
app.use(cookieParser());

// Route Imports
const route = require("../routes/user");
const product = require("../routes/product");

app.use("/api/v1", route);
app.use("/api/v1", product);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
