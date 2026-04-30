"use strict";

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        unique: true
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId, ref: "Showtime",
        unique: true
    },
    seatNumber: {
        type: Number,
        required: [true, "Seat Number is required!"],
        unique: true
    }
});


module.exports = mongoose.model('Reservation', reservationSchema);