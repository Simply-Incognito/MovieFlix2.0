"use strict";

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Showtime and Movie Models
const Showtime = require(`${__dirname}/../Models/showtime`);

const Movie = require(`${__dirname}/../Models/movie`);

exports.createShowtime = asyncErrorHandler(async (req, res, next) => {
    // req.body -> movie/movieId, time, room, price
    const movieRef = req.body.movie;

    // Check if movie exists
    const movie = await Movie.findById(movieRef);

    if (!movie) {
        return next(new CustomError("Failed: Movie Not Found.", 404));
    }

    // Ensure movie field is correctly set
    req.body.movie = movieRef;

    const showtime = await Showtime.create(req.body);

    return res.status(201).json({
        status: 'success',
        message: 'ShowTime Added Successfully!',
        data: { showtime }
    });
});

exports.getShowtimes = asyncErrorHandler(async (req, res, next) => {
    let filter = {};

    if (req.query.date) {
        const date = new Date(req.query.date);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return next(new CustomError("Invalid date format. Please use YYYY-MM-DD.", 400));
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        filter.time = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }

    const showtimes = await Showtime.find(filter).populate('movie');

    if (showtimes.length === 0) {
        return next(new CustomError("No showtimes found for the specified criteria.", 404));
    }

    res.status(200).json({
        status: 'success',
        count: showtimes.length,
        data: { showtimes }
    });
});

