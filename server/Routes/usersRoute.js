"use strict";

const router = require('express').Router();

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);
const userController = require(`${__dirname}/../Controllers/usersController`);

/**
 * @openapi
 * /api/v2/auth/promote/{id}:
 *   post:
 *     summary: Promote a user to admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to promote
 *     responses:
 *       200:
 *         description: User promoted successfully
 *       403:
 *         description: Forbidden - Admin only
 */
router.route('/promote/:id')
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), userController.promoteUser);

module.exports = router;