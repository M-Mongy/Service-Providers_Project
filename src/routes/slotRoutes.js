const express = require("express");
const router = express.Router();

const {
  createSlot,
  updateSlot,
  deleteSlot,
  getMySlots,
  getAvailableSlots,
} = require("../controllers/slotController");

const protect = require("../middleware/authMiddleware").protect;
const allowRoles = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Slots
 *   description: Slot management for providers and users
 */

/**
 * @swagger
 * /api/slots:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *               - duration
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-01"
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "10:00"
 *               duration:
 *                 type: number
 *                 example: 60
 *     responses:
 *       201:
 *         description: Slot created successfully
 *       401:
 *         description: Not authorized
 */
router.post("/", protect, allowRoles("provider"), createSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *   put:
 *     summary: Update an existing slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Slot updated successfully
 */
router.put("/:id", protect, allowRoles("provider"), updateSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *   delete:
 *     summary: Delete a slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The slot ID
 *     responses:
 *       200:
 *         description: Slot deleted successfully
 */
router.delete("/:id", protect, allowRoles("provider"), deleteSlot);

/**
 * @swagger
 * /api/slots/my:
 *   get:
 *     summary: Get all slots created by the logged-in provider
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of provider slots
 */
router.get("/my", protect, allowRoles("provider"), getMySlots);

/**
 * @swagger
 * /api/slots/available:
 *   get:
 *     summary: Get all available (unbooked) slots
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available slots
 */
router.get("/available", protect, getAvailableSlots);

module.exports = router;