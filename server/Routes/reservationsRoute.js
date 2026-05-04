"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const reservationsController = require(`${__dirname}/../Controllers/reservationsController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

/**
 * @openapi
 * /api/v2/reservations:
 *   get:
 *     summary: Get all reservations for the logged-in user
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user reservations
 *   post:
 *     summary: Create a new reservation (Book a seat)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [showtime, seat]
 *             properties:
 *               showtime: { type: string, description: Showtime ID }
 *               seat: { type: number, description: Seat number }
 *     responses:
 *       201:
 *         description: Reservation created successfully
 */
router.route('/')
    .post(authMiddleware.protect, reservationsController.makeReservation)
    .get(authMiddleware.protect, reservationsController.getAllReservations);

/**
 * @openapi
 * /api/v2/reservations/metrics:
 *   get:
 *     summary: Get system-wide reservation metrics
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Metrics details (Revenue, Capacity, etc.)
 */
router.route('/metrics')
    .get(authMiddleware.protect, authMiddleware.restrictTo('admin'), reservationsController.getReservationsMetrics);

/**
 * @openapi
 * /api/v2/reservations/{id}:
 *   delete:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reservation cancelled successfully
 */
router.route('/:id')
    .delete(authMiddleware.protect, reservationsController.cancelReservation);



module.exports = router;
