"use strict";

const mongoose = require('mongoose');

const showtimeSchema = mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    time: {
        type: Date,
        required: [true, "Show Time is required"],
        unique: true
    },
    room: {
        type: String,
        required: [true, "Room/Theater is required!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required!"]
    }
});

module.exports = mongoose.model('Showtime', showtimeSchema);