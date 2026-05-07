const cron = require("node-cron");

const Appointment = require("../models/appointmentModel");
const sendReminderEmail = require("../services/sendReminderEmail");

const startReminderJob = () => {
    // every minute
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Checking appointments...");

            const appointments = await Appointment.find({
                status: "upcoming",
                reminderSent: false,
            })
                .populate("user")
                .populate("slot");

            const now = new Date();

            for (const appointment of appointments) {

                const slotDateTime = new Date(
                    `${appointment.slot.date.toISOString().split("T")[0]}T${appointment.slot.startTime}:00`
                );

                console.log("Now:", now);
                console.log("Appointment time:", appointment.appointmentTime);
                console.log("Reminder sent:", appointment.reminderSent);

                const diffInMinutes =
                    (appointment.appointmentTime - now) / (1000 * 60);

                console.log("Difference:", diffInMinutes);

                // send if between 29-30 minutes
                if (diffInMinutes <= 30 && diffInMinutes > 0 && !appointment.reminderSent) {

                    await sendReminderEmail(
                        appointment.user.email,
                        appointment.slot
                    );

                    appointment.reminderSent = true;

                    await appointment.save();

                    console.log(
                        `Reminder sent to ${appointment.user.email}`
                    );
                }
            }

        } catch (err) {
            console.log("Reminder Job Error:", err.message);
        }
    });
};

module.exports = startReminderJob;