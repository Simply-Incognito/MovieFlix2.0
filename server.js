"use strict";

const connectDB = require(`${__dirname}/Utils/ConnectDB`);

// Configure Environment File
require('dotenv').config({ path: `${__dirname}/config.env`, quiet: false, debug: true, override: false });

const app = require(`${__dirname}/app`);



// Connect To DB
connectDB(process.env.LOCAL_DB_URI);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});