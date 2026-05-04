"use strict";

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime"
    },
    seat: {
        type: Number,
        required: [true, "Seat Number is required!"]
    }
});


module.exports = mongoose.model('Reservation', reservationSchema);