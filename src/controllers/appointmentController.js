const Appointment = require("../models/appointmentModel");
const Slot = require("../models/slotModel");

const {appointmentIdSchema,slotIdSchema,} = require("../validations/appointmentValidator");

const { USER } = require("../constants/roles");

const {sendError,sendSuccess,} = require("../utils/response");


exports.getAvailableSlots = async (req, res) => {
  try {
    const filter = { isBooked: false };

    if (req.query.provider) {
      filter.provider = req.query.provider;
    }

    const slots = await Slot.find(filter).populate(
      "provider",
      "name email"
    );

    return sendSuccess(res, 200, slots, "Slots fetched successfully");

  } catch (error) {
    return sendError(res, 500, error.message);
  }
};


exports.bookAppointment = async (req, res) => {
  try {
    if (req.user.role !== USER) {
      return sendError(res, 403, "Only users can book appointments");
    }

    const { error, value } = slotIdSchema.validate(req.params);
    if (error) {
      return sendError(res, 400, error.details[0].message);
    }

    const { slotId } = value;

    const slot = await Slot.findOne({
      _id: slotId,
      isBooked: false,
    });

    if (!slot) {
      return sendError(
        res,
        400,
        "Slot is already booked or not found"
      );
    }

    const appointment = await Appointment.create({
      slot: slot._id,
      user: req.user.id,
      provider: slot.provider,
      appointmentTime: slot.date,
    });

    slot.isBooked = true;
    await slot.save();

    return sendSuccess(
      res,
      201,
      appointment,
      "Appointment booked successfully"
    );

  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 400, "This slot is already booked");
    }

    return sendError(res, 500, error.message);
  }
};


exports.cancelAppointment = async (req, res) => {
  try {
    if (req.user.role !== USER) {
      return sendError(res, 403, "Only users can cancel appointments");
    }

    const { error, value } = appointmentIdSchema.validate(req.params);
    if (error) {
      return sendError(res, 400, error.details[0].message);
    }

    const { appointmentId } = value;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      user: req.user.id,
    });

    if (!appointment) {
      return sendError(res, 404, "Appointment not found");
    }

    if (appointment.status === "cancelled") {
      return sendError(res, 400, "Appointment already cancelled");
    }

    await Slot.findByIdAndUpdate(appointment.slot, {
      isBooked: false,
    });

    appointment.status = "cancelled";
    await appointment.save();

    return sendSuccess(
      res,
      200,
      null,
      "Appointment cancelled successfully"
    );

  } catch (error) {
    return sendError(res, 500, error.message);
  }
};