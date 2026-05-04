"use strict";

const movieController = require(`${__dirname}/../Controllers/movieController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

router.route('/')
    .get(movieController.getAllMovies)
    .post(authMiddleware.protect, authMiddleware.restrictTo('Admin'), movieController.addMovie);

router.route('/:id')
    .get(movieController.getMovie)
    .patch(authMiddleware.protect, authMiddleware.restrictTo('Admin'), movieController.updateMovie)
    .delete(authMiddleware.protect, authMiddleware.restrictTo('Admin'), movieController.deleteMovie);

module.exports = router;