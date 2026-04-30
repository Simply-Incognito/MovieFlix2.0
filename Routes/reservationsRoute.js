"use strict";

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();


module.exports = router;
