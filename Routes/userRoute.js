"use strict";

const router = require('express').Router();

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);
const userController = require(`${__dirname}/../Controllers/usersController`);

router.route('/promote/:id')
    .post(authMiddleware.protect, authMiddleware.restrictTo('Admin'), userController.promoteUser);

module.exports = router;