"use strict";

const movieController = require(`${__dirname}/../Controllers/movieController`);

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.use(authMiddleware);

router.route('/')
    .get(movieController.getAllMovies)
    .post(authController.restrict, movieController.addMovie);

router.route('/:id')
    .get(movieController.getMovie)
    .patch(authController.restrict, movieController.updateMovie)
    .delete(authController.restrict, movieController.deleteMovie);

module.exports = router;