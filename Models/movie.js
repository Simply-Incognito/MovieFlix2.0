"use strict";

const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required!"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Movie description is required!"],
        trim: true
    },
    posterImage: String,
    genre: {
        type: String,
        trim: true,
        required: [true, "Movie Genre is required!"],
        enum: ["drama", "comedy", "action", "horror", "sci-fi", "thriller", "fantasy", "sports", "apocalypse", "romance", "western", "martial arts"]
    },
    showtime: {
        type: Date,
        required: [true, "Movie showtime is required!"]
    }
});