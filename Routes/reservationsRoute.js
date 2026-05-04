"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const reservationsController = require(`${__dirname}/../Controllers/reservationsController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.route('/')
    .post(authMiddleware, reservationsController.makeReservation)
    .get(authMiddleware, reservationsController.getAllReservations);

router.route('/:id')
    .delete(authMiddleware, reservationsController.cancelReservation);


module.exports = router;
