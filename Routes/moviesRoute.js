"use strict";

const movieController = require(`${__dirname}/../Controllers/movieController`);

const authController = require(`${__dirname}/../Controllers/authController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.route('/')
    .get(authMiddleware, movieController.getAllMovies)
    .post(authMiddleware, authController.restrict, movieController.addMovie);

router.route('/:id')
    .get(authMiddleware, movieController.getMovie)
    .patch(authMiddleware, authController.restrict, movieController.updateMovie)
    .delete(authMiddleware, authController.restrict, movieController.deleteMovie);

module.exports = router;