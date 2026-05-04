"use strict";

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Movie Model
const Movie = require(`${__dirname}/../Models/movie`);

// Admin and User
exports.getAllMovies = asyncErrorHandler(async (req, res, next) => {

    const query = req.query;

    console.log(query)

    const movies = await Movie.find();

    res.status(200).json({
        status: "success",
        message: "Movies fetched successfully",
        data: {
            count: movies.length,
            movies
        }
    });

});

// Admin Only
exports.addMovie = asyncErrorHandler(async (req, res, next) => {

    const movie = await Movie.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Movie added successfully",
        data: {
            movie
        }
    });
});

// Admin and User
exports.getMovie = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;

    const movie = await Movie.findById(id);

    if (!movie) {
        return next(new CustomError("Movie not found.", 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Movie found',
        data: { movie }
    });
});

// Admin only
exports.updateMovie = asyncErrorHandler(async (req, res, next) => {
    if (!req.body) {
        return next(new CustomError("Invalid request.", 400));
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedMovie) {
        return next(new CustomError("Movie not found.", 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Movie updated successfully!',
        data: { updatedMovie }
    });

});

// Admin only
exports.deleteMovie = asyncErrorHandler(async (req, res, next) => {

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
        return next(new CustomError("Movie not found.", 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});