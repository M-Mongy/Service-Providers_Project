require("dotenv").config();

const express = require('express')
const app = express()

const connectDB = require("./config/db");
connectDB();

const setupSwagger = require("./config/swagger");
setupSwagger(app);

app.use(express.json());

module.exports = app;