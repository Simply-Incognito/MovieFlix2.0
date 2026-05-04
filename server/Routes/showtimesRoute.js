"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const showtimeController = require(`${__dirname}/../Controllers/showtimesController`);

const router = require('express').Router();

router.route('/')
    .get(authMiddleware.protect, showtimeController.getShowtimes)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), showtimeController.createShowtime);

router.route('/:id/seats')
    .get(authMiddleware.protect, showtimeController.getShowtimeSeats);

router.route('/:id')
    .delete(authMiddleware.protect, authMiddleware.restrictTo('admin'), showtimeController.deleteShowtime);

module.exports = router;
