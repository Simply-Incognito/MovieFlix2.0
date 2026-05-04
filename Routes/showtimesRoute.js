"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const showtimeController = require(`${__dirname}/../Controllers/showtimesController`);

const router = require('express').Router();

router.route('/')
    .post(authMiddleware, authController.restrict, showtimeController.createShowtime)
    .get(authMiddleware, showtimeController.getShowtimes);

router.route('/:id/seats')
    .get(authMiddleware, showtimeController.getShowtimeSeats);

module.exports = router;
