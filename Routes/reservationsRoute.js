"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const reservationsController = require(`${__dirname}/../Controllers/reservationsController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.route('/')
    .post(authMiddleware.protect, reservationsController.makeReservation)
    .get(authMiddleware.protect, reservationsController.getAllReservations);

router.route('/:id')
    .delete(authMiddleware.protect, reservationsController.cancelReservation);


module.exports = router;
