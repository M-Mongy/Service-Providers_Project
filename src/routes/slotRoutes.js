const express = require("express");
const router = express.Router();

const {
  createSlot,
  updateSlot,
  deleteSlot,
  getMySlots,
} = require("../controllers/slotController");

const protect = require("../middleware/authMiddleware").protect;
const authorize = require("../middleware/providerAuthorize");

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
 *                 example: "2026-05-10"
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
 */
router.post("/", protect, authorize("provider"), createSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *   put:
 *     summary: Update a slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, authorize("provider"), updateSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *   delete:
 *     summary: Delete a slot
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, authorize("provider"), deleteSlot);

/**
 * @swagger
 * /api/slots/my:
 *   get:
 *     summary: Get provider slots
 *     tags: [Slots]
 *     security:
 *       - bearerAuth: []
 */
router.get("/my", protect, authorize("provider"), getMySlots);


module.exports = router;