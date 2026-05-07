const transporter = require("../config/email");

const sendReminderEmail = async (userEmail, slot) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Appointment Reminder",
    html: `
      <h2>Appointment Reminder</h2>
      <p>Your appointment is in 30 minutes.</p>
      <p>Date: ${slot.date}</p>
      <p>Time: ${slot.startTime}</p>
    `,
  });
};

module.exports = sendReminderEmail;