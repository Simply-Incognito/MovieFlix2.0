"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const showtimeController = require(`${__dirname}/../Controllers/showtimesController`);

const router = require('express').Router();

router.route('/')
    .post(authMiddleware.protect, authMiddleware.restrictTo('Admin'), showtimeController.createShowtime)
    .get(authMiddleware.protect, showtimeController.getShowtimes);

router.route('/:id/seats')
    .get(authMiddleware.protect, showtimeController.getShowtimeSeats);

module.exports = router;
