const Appointment = require("../models/appointmentModel");
const Slot = require("../models/slotModel");


exports.getAvailableSlots = async (req, res) => {
  try {
    const filter = {
      isBooked: false
    };


    if (req.query.provider) {
      filter.provider = req.query.provider;
    }

    const slots = await Slot.find(filter)
      .populate("provider", "name email");

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.bookAppointment = async (req, res) => {
try {
    const { slotId } = req.params;

    // Use req.user (standard) instead of res.req.user
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can book appointments"
      });
    }

    const slot = await Slot.findOne({
      _id: slotId,
      isBooked: false
    });

    if (!slot) {
      return res.status(400).json({
        success: false,
        message: "Slot is already booked or not found"
      });
    }

    // FIX: Include appointmentTime by using the slot's date
    const appointment = await Appointment.create({
      slot: slot._id,
      user: req.user.id,
      provider: slot.provider,
      appointmentTime: slot.date // This satisfies the 'required' constraint
    });

    slot.isBooked = true;
    await slot.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked"
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    if(res.req.user.role !== "user"){
      return res.status(403).json({
        success: false,
        message: "Only users can cancel appointments"
      });
    }
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      user: req.user.id
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }
    
    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment already cancelled"
      });
    }

    await Slot.findByIdAndUpdate(
      appointment.slot,
      {
        isBooked: false
      }
    );

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};