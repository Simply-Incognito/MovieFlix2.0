"use strict";

const router = require('express').Router();

const authController = require(`${__dirname}/../Controllers/authController`);

/**
 * @openapi
 * /api/v2/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, email, password, confirmPassword]
 *             properties:
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               confirmPassword: { type: string }
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.route('/register').post(authController.register);

/**
 * @openapi
 * /api/v2/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *       401:
 *         description: Unauthorized
 */
router.route('/login').post(authController.login);

module.exports = router;