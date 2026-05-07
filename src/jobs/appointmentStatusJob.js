const cron = require("node-cron");
const Appointment = require("../models/appointmentModel");

const startAppointmentStatusJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const expired = await Appointment.updateMany(
        {
          appointmentTime: { $lt: now },
          status: "upcoming",
        },
        {
          $set: { status: "expired" },
        }
      );

      await Appointment.updateMany(
        {
          status: "cancelled",
        },
        {
          $set: { status: "cancelled" },
        }
      );

      console.log(`Expired updated: ${expired.modifiedCount}`);
    } catch (err) {
      console.log("Cron error:", err.message);
    }
  });
};

module.exports = startAppointmentStatusJob;