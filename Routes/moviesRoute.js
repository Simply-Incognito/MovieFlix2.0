"use strict";

const movieController = require(`${__dirname}/../Controllers/movieController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.route('/').get(authMiddleware, movieController.getAllMovies);

module.exports = router;