"use strict";

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Rooms Model
const Room = require(`${__dirname}/../Models/room`);

exports.addRoom = asyncErrorHandler(async (req, res, next) => {
    // Check if room exists
    let room = await Room.findOne({ number: req.body.number });

    if (room) {
        return next(new CustomError("Room already exists!", 400));
    }

    room = await Room.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Room added successfully!',
        data: { room }
    });
});

// Get all rooms
exports.getAllRooms = asyncErrorHandler(async (req, res, next) => {
    const rooms = await Room.find();

    res.status(200).json({
        status: 'success',
        count: rooms.length,
        data: { rooms }
    });
});

// Update Room
exports.updateRoom = asyncErrorHandler(async (req, res, next) => {
    let room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!room) {
        return next(new CustomError("Room not found!", 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Room updated successfully!',
        data: { room }
    });
});
