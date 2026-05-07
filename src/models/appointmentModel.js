const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentTime: {
      type: Date,
      required: true
    },

    reminderSent: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled", "expired"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);