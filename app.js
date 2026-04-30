"use strict";

const express = require('express');

const globalErrorHandler = require(`${__dirname}/Controllers/errorHandler`);


const app = express();

// Middlewares
app.use(express.json());

// Routers
const authRouter = require(`${__dirname}/Routes/authRoute`);
const userRouter = require(`${__dirname}/Routes/userRoute`);
const moviesRouter = require(`${__dirname}/Routes/moviesRoute`);

app.use('/api/v2/auth', authRouter);
app.use('/api/v2/auth', userRouter);
app.use('/api/v2/movies', moviesRouter);

// Default Routes
app.use((req, res) => {
    return res.status(404).json({
        status: 'fail',
        "message": "How did you get here?"
    });
});

// Handle Global Errors
app.use(globalErrorHandler)


module.exports = app;