"use strict";

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);

const CustomError = require(`${__dirname}/../Utils/CustomError`);

// Movie Model
const Movie = require(`${__dirname}/../Models/movie`);

exports.getAllMovies = asyncErrorHandler((req, res, next) => {
   
});