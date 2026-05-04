"use strict";
const mongoose = require('mongoose');

const reservation = require("../Models/reservation");
const showtime = require("../Models/showtime");

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Reservation  and Showtime Models
const Reservation = require(`${__dirname}/../Models/reservation`);

const Showtime = require(`${__dirname}/../Models/showtime`);

// Users
exports.makeReservation = asyncErrorHandler(async (req, res, next) => {

    // 1. Start Session
    const session = await mongoose.startSession();

    try {
        // 2. Start Transaction
        await session.withTransaction(async () => {
            // Check if seat number exists in the room
            const showtime = await Showtime.findOne({ _id: req.body.showtime })
                .select('room movie')
                .populate('movie')
                .populate('room', 'capacity');

            // return console.log(showtime)

            if (!showtime || !showtime.movie) {
                throw new CustomError("This showtime or movie is no longer available.", 404);
            }

            if (req.body.seat < 1 || req.body.seat > showtime.room.capacity) {
                throw new CustomError(`Invalid seat number! Seat number must be between 1 and ${showtime.room.capacity}.`, 400);
            }

            req.body.user = req.user._id;

            // 3. Check for existing reservation WITHIN the session
            const testReservation = await Reservation.findOne({
                showtime: req.body.showtime,
                seat: req.body.seat
            }).session(session); // <---- Attach session here -> make operation atomic

            if (testReservation) {
                throw new CustomError("Seat number is already taken!", 400);
            }

            // 4. Create reservation WITHIN the transaction
            const reservation = await Reservation.create([req.body], { session }); // <---- Attach session here -> make operation atomic

            res.status(201).json({
                status: 'success',
                message: "Reserved!",
                data: { reservation }
            });

        });

    } catch (error) {
        // If error occurs, the transaction is auto aborted
        next(error);

    } finally {
        // 5. End session (Important!)
        await session.endSession();
    }
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
        return next(new CustomError("Reservation not found!", 404));
    }

    if (reservation.user.toString() !== req.user.id.toString()) {
        return next(new CustomError("You are not authorized to cancel this reservation.", 403));
    }

    const showtime = await Showtime.findById(reservation.showtime);

    // Reservations can be cancelled minimum 24 hours before the showtime
    const cancelDeadline = new Date(showtime.time.getTime() - 24 * 60 * 60 * 1000);

    if (cancelDeadline < Date.now()) {
        return next(new CustomError("You cannot cancel this reservation. It must be cancelled at least 24 hours before the showtime.", 400));
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
    // 1. Get all reservations with populated details
    const allReservations = await Reservation.find()
        .populate('user', 'firstname lastname email')
        .populate({
            path: 'showtime',
            populate: { path: 'movie', select: 'title' }
        });

    // 2. Calculate Revenue and Total Reservations using Aggregation
    const revenueStats = await Reservation.aggregate([
        {
            $lookup: {
                from: 'showtimes', // MongoDB collection name for Showtime
                localField: 'showtime',
                foreignField: '_id',
                as: 'showtimeDetails'
            }
        },
        { $unwind: '$showtimeDetails' },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$showtimeDetails.price' },
                totalReservations: { $sum: 1 }
            }
        }
    ]);

    // 3. Calculate Overall Capacity
    const capacityStats = await Showtime.aggregate([
        {
            $group: {
                _id: null,
                totalCapacity: { $sum: '$capacity' }
            }
        }
    ]);

    const metrics = {
        totalReservations: revenueStats[0]?.totalReservations || 0,
        totalRevenue: revenueStats[0]?.totalRevenue || 0,
        totalCapacity: capacityStats[0]?.totalCapacity || 0,
        occupancyRate: capacityStats[0]?.totalCapacity > 0
            ? ((revenueStats[0]?.totalReservations || 0) / capacityStats[0].totalCapacity * 100).toFixed(2) + '%'
            : '0%'
    };

    res.status(200).json({
        status: 'success',
        data: {
            metrics,
            reservations: allReservations
        }
    });
});
