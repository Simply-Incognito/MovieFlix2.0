"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const roomController = require(`${__dirname}/../Controllers/roomsController`);

const router = require('express').Router();

/**
 * @openapi
 * /api/v2/rooms:
 *   get:
 *     summary: List all theater rooms
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 *   post:
 *     summary: Add a new theater room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [number, capacity, type]
 *             properties:
 *               number: { type: number }
 *               capacity: { type: number }
 *               type: { type: string, enum: [standard, vip, premium] }
 *     responses:
 *       201:
 *         description: Room created successfully
 */
router.route('/')
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.addRoom)
    .get(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.getAllRooms);

/**
 * @openapi
 * /api/v2/rooms/{id}:
 *   patch:
 *     summary: Update room details
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Room updated successfully
 */
router.route('/:id')
    .patch(authMiddleware.protect, authMiddleware.restrictTo('admin'), roomController.updateRoom);

module.exports = router;