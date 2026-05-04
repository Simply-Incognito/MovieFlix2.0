"use strict";

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, "Room number is required!"],
        unique: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, "Room capacity is required!"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Room type is required!"],
        trim: true,
        enum: ["standard", "vip", "premium"]
    },
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Movie",
    }
});


const Room = mongoose.model('Room', roomSchema);


module.exports = Room;
