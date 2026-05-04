"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const roomController = require(`${__dirname}/../Controllers/roomsController`);

const router = require('express').Router();

router.route('/')
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.addRoom)
    .get(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.getAllRooms);

router.route('/:id')
    .patch(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.updateRoom);

module.exports = router;