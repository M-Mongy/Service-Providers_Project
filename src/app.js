require("dotenv").config();

const express = require('express')
const app = express()
app.use(express.json());

// appointment status job
const startAppointmentStatusJob = require("./jobs/appointmentStatusJob");
startAppointmentStatusJob();

// validators
const validate = require('./validations/validate');
const { signupSchema } = require('./validations/authValidator');
const { createSlotSchema } = require('./validations/slotValidator');

// Mongo DB
const connectDB = require("./config/db");
connectDB();

// Swagger
const setupSwagger = require("./config/swagger");
setupSwagger(app);

// jobs 
const startReminderJob = require("./jobs/reminderJob");
startReminderJob();

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
// slot Routes

const slotRoutes = require("./routes/slotRoutes");
app.use("/api/slots", slotRoutes);

// appointmentRoutes
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);



module.exports = app;