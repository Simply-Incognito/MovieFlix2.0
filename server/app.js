"use strict";

const express = require('express');

const globalErrorHandler = require(`${__dirname}/Controllers/errorHandler`);
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');



const app = express();

// Middlewares
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MovieFlix 2.0 API',
            version: '1.0.0',
            description: 'API documentation for MovieFlix 2.0 reservation system',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [`${__dirname}/Routes/*.js`],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routers
const authRouter = require(`${__dirname}/Routes/authRoute`);
const usersRouter = require(`${__dirname}/Routes/usersRoute`);
const roomsRouter = require(`${__dirname}/Routes/roomsRoute`);
const moviesRouter = require(`${__dirname}/Routes/moviesRoute`);
const showtimeRouter = require(`${__dirname}/Routes/showtimesRoute`);
const reservationsRouter = require(`${__dirname}/Routes/reservationsRoute`);

app.use('/api/v2/auth', authRouter);
app.use('/api/v2/auth', usersRouter);
app.use('/api/v2/rooms', roomsRouter);
app.use('/api/v2/movies', moviesRouter);
app.use('/api/v2/showtimes', showtimeRouter);
app.use('/api/v2/reservations', reservationsRouter);

// Default Routes
app.use((req, res) => {
    return res.status(404).json({
        status: 'fail',
        "message": "How did you get here?"
    });
});

// Handle Global Errors
app.use(globalErrorHandler);


module.exports = app;