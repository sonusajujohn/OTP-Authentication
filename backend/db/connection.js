const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB_URL = process.env.MONGODB_URL;


mongoose.connect(mongoDB_URL,)
    .then(() => {
        console.log("Database connection established successfully");
    })
    .catch((err) => {
        console.log("Database connection failed");
        console.error(err);
    });
