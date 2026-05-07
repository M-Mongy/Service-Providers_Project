const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware").protect;

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment booking and management
 */

/**
 * @swagger
 * /api/appointments/slots:
 *   get:
 *     summary: Get all available slots for booking
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of available slots
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/slots",
  protect,
  appointmentController.getAvailableSlots
);

/**
 * @swagger
 * /api/appointments/{slotId}:
 *   post:
 *     summary: Book an appointment for a specific slot
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the slot to book
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Slot already booked or invalid
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/:slotId",
  protect,
  appointmentController.bookAppointment
);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   delete:
 *     summary: Cancel an existing appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to cancel
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:appointmentId",
  protect,
  appointmentController.cancelAppointment
);

module.exports = router;