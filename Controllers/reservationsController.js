"use strict";

const reservation = require("../Models/reservation");
const showtime = require("../Models/showtime");

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Reservation  and Showtime Models
const Reservation = require(`${__dirname}/../Models/reservation`);

const Showtime = require(`${__dirname}/../Models/showtime`);

// Users
exports.makeReservation = asyncErrorHandler(async (req, res, next) => {
    req.body.user = req.user._id;

    // Get Showtime with particular movieId
    const movieShowtime = await Showtime.findOne({ movie: req.body.movie });

    // MovieShowTime -> Movie, Time, Room, Price

    if (!movieShowtime) {
        return next(new CustomError("Movie is not airing at specified time.", 404));
    }

    req.body = {
        user: req.body.user,
        showtime: movieShowtime._id,
        seat: req.body.seat
    }

    //return console.log(req.body)

    // Check if seat number is taken
    const testReservation = await Reservation.findOne({ showtime: req.body.showtime, seat: req.body.seat });

    // If reservation with seat number exists, return error
    if (testReservation) {
        return next(new CustomError("Seat Number is not available!", 404));
    }

    const reservation = await Reservation.create(req.body);

    // console.log(reservation)

    return res.status(201).json({
        status: 'success',
        message: "Reservation made successfully!",
        data: { reservation }
    });
});

// Users
exports.getAllReservations = asyncErrorHandler(async (req, res, next) => {

    const reservations = await Reservation.find({ user: req.user._id }).populate({
        path: 'showtime',
        populate: {
            path: 'movie'
        }
    });

    //console.log(reservations)

    if (reservations.length === 0) {
        return next(new CustomError("No reservation found!", 404));
    }

    return res.status(200).json({
        status: 'success',
        message: "Reservations fetched successfully.",
        count: reservations.length,
        data: { reservations }
    });
});

// User
exports.cancelReservation = asyncErrorHandler(async (req, res, next) => {
    // Check if reservation exists 
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
        return next(new CustomError("Resrevation not found!", 404));
    }

    const showtime = await Showtime.findById(reservation.showtime);

    if (showtime.time > Date.now()) {
        return next(new CustomError("You cannot cancel this reservation.", 400));
    }

    await Reservation.findByIdAndDelete(req.params.id);

    return res.status(204).json({
        status: 'success',
        data: null
    });
});

// Admin
// See all Reservations, capacity, revenue  
exports.getReservationsMetrics = asyncErrorHandler(async (req, res, next) => {

})