"use strict";

const mongoose = require('mongoose');

const showtimeSchema = mongoose.Schema({
    movie: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: "Movie"}
    },
    time: {
        type: Date,
        required: [true, "Show Time is required"]
    },
    room: {
        type: Number,
        required: [true, "Room/Theater is required!"]
    }
});

module.exports = mongoose.model('Showtime', showtimeSchema);