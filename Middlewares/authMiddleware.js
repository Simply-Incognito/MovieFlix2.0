"use strict";

const jwt = require('jsonwebtoken');

const asyncErrorHandler = require(`${__dirname}/../Utils/asyncErrorHandler`);
const CustomError = require(`${__dirname}/../Utils/CustomError`);

// User Model
const User = require(`${__dirname}/../Models/user`);

module.exports = asyncErrorHandler(async (req, res, next) => {
    // Check if token exists
    var token;

    if (req.headers.authorization && req.headers.authorization.startsWith("bearer")) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookie && req.cookie.token) {
        token = req.cookie.token;
    }

    if (!token) {
        return next(new CustomError("You are not logged in!", 401));
    }

    // Verify Token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch User
    const user = await User.findById(decodedToken.id);

    if (!user) {
        return next(new CustomError("User does not exist!", 404));
    }

    // Check if User Changed Password After Token Was Issued

    const isPasswordModified = user.isPasswordModified(decodedToken.iat);

    if (isPasswordModified) {
        return next(new CustomError("Password changed recently. Please login again.", 400));
    }

    // Check if user is inactive

    if (!user.active) {
        return next(new CustomError("Your account is disabled! Please contact the administrator.", 403));
    }

    // Allow user to access the route
    req.user = user;
    next(); // Call next middleware

});