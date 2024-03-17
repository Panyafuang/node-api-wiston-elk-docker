const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
const logger = require('./logger/logger.js');

const app = express();

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

/**
 * DEV PORT = 3000
 * PROD PORT = 8000
 */
let PORT = process.env.PORT || 8080;

app.get("", (req, res, next) => {
  logger.info("GET: api/v1/");
  logger.warn("text warn", { meta: 123 });
  res.status(200).json({ success: true, message: "Home Page" });
});

app.get("/api/v1/products", (req, res, next) => {
  const reqLog = {
    method: "GET",
    isAuthenticated: false,
  };
  logger.info("GET: /api/v1/products");
  logger.warn("api/v1/products", reqLog);
  res.status(200).json({
    success: true,
    data: [],
  });
});

app.get("/not-found", (req, res, next) => {
  logger.error("An error log", new Error("504 Gateway timeout!!"));
  res.status(504).json({
    success: false,
    message: "someting went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON :${PORT}`);
});
