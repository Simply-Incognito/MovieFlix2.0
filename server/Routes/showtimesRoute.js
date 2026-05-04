"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const showtimeController = require(`${__dirname}/../Controllers/showtimesController`);

const router = require('express').Router();

/**
 * @openapi
 * /api/v2/showtimes:
 *   get:
 *     summary: List all showtimes
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter showtimes by date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of showtimes
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [movie, room, time, price]
 *             properties:
 *               movie: { type: string, description: Movie ID }
 *               room: { type: string, description: Room ID }
 *               time: { type: string, format: date-time }
 *               price: { type: number }
 *     responses:
 *       201:
 *         description: Showtime created successfully
 */
router.route('/')
    .get(authMiddleware.protect, showtimeController.getShowtimes)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), showtimeController.createShowtime);

/**
 * @openapi
 * /api/v2/showtimes/{id}/seats:
 *   get:
 *     summary: Get available and reserved seats for a showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat availability details
 */
router.route('/:id/seats')
    .get(authMiddleware.protect, showtimeController.getShowtimeSeats);

/**
 * @openapi
 * /api/v2/showtimes/{id}:
 *   delete:
 *     summary: Delete a showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 */
router.route('/:id')
    .delete(authMiddleware.protect, authMiddleware.restrictTo('admin'), showtimeController.deleteShowtime);

module.exports = router;
