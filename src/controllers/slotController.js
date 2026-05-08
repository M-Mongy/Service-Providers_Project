const Slot = require("../models/slotModel");
const mongoose = require("mongoose");

const {createSlotSchema,updateSlotSchema,} = require("../validations/slotValidator");

const createSlot = async (req, res) => {
  try {
    const { error, value } = createSlotSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    
    const providerId = req.user.id;

    const slot = await Slot.create({
      provider: providerId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      duration: req.body.duration,
    });

    res.status(201).json({
      message: "Slot created successfully",
      slot,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateSlot = async (req, res) => {
  try {

    const slotId = req.params.id;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.provider.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your own slots",
      });
    }

    const updated = await Slot.findByIdAndUpdate(
      slotId,
      req.body,
      { new: true }
    );

    res.json({
      message: "Slot updated successfully",
      updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getAvailableSlots = async (req, res) => {
  try {
    const query = { isBooked: false };

    if (req.query.provider) {
      if (!mongoose.Types.ObjectId.isValid(req.query.provider)) {
        return res.status(400).json({ success: false, message: "Invalid Provider ID" });
      }
      query.provider = req.query.provider;
    }
    
    const slots = await Slot.find(query).populate("provider", "name email");

    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};




const getMySlots = async (req, res) => {
  try {
    const providerId = req.user.id;

    const slots = await Slot.find({ provider: providerId });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteSlot = async (req, res) => {
  try {
    const slotId = req.params.id;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.provider.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own slots",
      });
    }

    await Slot.findByIdAndDelete(slotId);

    res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSlot,
  updateSlot,
  deleteSlot,
  getAvailableSlots,
  getMySlots,
};