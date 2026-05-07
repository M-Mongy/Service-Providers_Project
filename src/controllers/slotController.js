const Slot = require("../models/slotModel");

const createSlot = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "provider") {
      return res.status(403).json({ error: "Access denied. Providers only." });
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
    if (!req.user || req.user.role !== "provider") {
      return res.status(403).json({ error: "Access denied. Providers only." });
    }
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
    const slots = await Slot.find({ isBooked: false }).populate("provider");

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getMySlots = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "provider") {
      return res.status(403).json({ error: "Access denied. Providers only." });
    }
    const providerId = req.user.id;

    const slots = await Slot.find({ provider: providerId });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteSlot = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "provider") {
      return res.status(403).json({ error: "Access denied. Providers only." });
    }
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