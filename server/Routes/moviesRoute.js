"use strict";

const movieController = require(`${__dirname}/../Controllers/movieController`);

const authMiddleware = require(`${__dirname}/../Middlewares/authMiddleware`);

const router = require('express').Router();

/**
 * @openapi
 * /api/v2/movies:
 *   get:
 *     summary: Retrieve a list of all active movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               genre: { type: string }
 *               duration: { type: number }
 *               language: { type: string }
 *     responses:
 *       201:
 *         description: Movie created successfully
 */
router.route('/')
    .get(movieController.getAllMovies)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), movieController.addMovie);

/**
 * @openapi
 * /api/v2/movies/{id}:
 *   get:
 *     summary: Get details of a specific movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 *   patch:
 *     summary: Update movie details
 *     tags: [Movies]
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
 *         description: Movie updated successfully
 *   delete:
 *     summary: Soft-delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Movie deactivated successfully
 */
router.route('/:id')
    .get(movieController.getMovie)
    .patch(authMiddleware.protect, authMiddleware.restrictTo('admin'), movieController.updateMovie)
    .delete(authMiddleware.protect, authMiddleware.restrictTo('admin'), movieController.deleteMovie);

module.exports = router;