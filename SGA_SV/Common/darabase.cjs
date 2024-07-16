const { Client } = require('pg');
require('dotenv').config();

const connectToDatabase = () => {


    const pgCUSR = {
        user: process.env.BTP_USERNAME,
        host: process.env.BTP_HOST,
        database: process.env.BTP_DATABASE,
        password: process.env.BTP_PASSWORD,
        port: process.env.BTP_PORT,
    };

    const pgGC = {
        user: process.env.BTP_USERNAME,
        host: process.env.BTP_HOST,
        database: process.env.BTP_DATABASE,
        password: process.env.BTP_PASSWORD,
        port: process.env.BTP_PORT,
    };


    return { pgCUSR,pgGC };
};

module.exports = connectToDatabase;