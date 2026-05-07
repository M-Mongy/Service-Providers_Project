require("dotenv").config();

const express = require('express')
const app = express()

app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const setupSwagger = require("./config/swagger");
setupSwagger(app);

//auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const slotRoutes = require("./routes/slotRoutes");
app.use("/api/slots", slotRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

module.exports = app;