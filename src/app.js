require("dotenv").config();

const express = require('express')
const app = express()

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

module.exports = app;