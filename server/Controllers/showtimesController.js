"use strict";

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Showtime and Movie Models
const Showtime = require(`${__dirname}/../Models/showtime`);

const Movie = require(`${__dirname}/../Models/movie`);

const Room = require(`${__dirname}/../Models/room`);

const Reservation = require(`${__dirname}/../Models/reservation`);

// Admin only
exports.createShowtime = asyncErrorHandler(async (req, res, next) => {
    // req.body -> movie/movieId, time, room, price
    const movieRef = req.body.movie;

    // Check if movie exists
    const movie = await Movie.findById(movieRef);

    if (!movie) {
        return next(new CustomError("Failed: Movie Not Found.", 404));
    }

    // check if movie would air in the room
    const room = await Room.findById(req.body.room);

    if (!room) {
        return next(new CustomError("Failed: Room Not Found.", 404));
    }

    if (!room.movies.includes(movieRef)) {
        return next(new CustomError("Failed: Movie would not air in this room.", 400));
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

// Users + Admin
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

// User + Admin
exports.getShowtimeSeats = asyncErrorHandler(async (req, res, next) => {
    const showtime = await Showtime.findById(req.params.id).populate('room', 'capacity');

    if (!showtime) {
        return next(new CustomError("Showtime not found!", 404));
    }

    // Get all reservations (booked seats) for this showtime
    const reservations = await Reservation.find({ showtime: req.params.id }).select('seat');
    
    const reservedSeats = reservations.map(res => res.seat);

    // Generate all available seats based on capacity
    const totalSeats = showtime.room.capacity;
    const availableSeats = [];

    for (let i = 1; i <= totalSeats; i++) {
        !reservedSeats.includes(i) && availableSeats.push(i);
    }

    res.status(200).json({
        status: 'success',
        data: {
            totalSeats,
            reservedSeats,
            availableSeats
        }
    });
});

