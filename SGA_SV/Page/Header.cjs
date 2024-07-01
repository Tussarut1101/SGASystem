const express = require("express");
const { Client } = require("pg");
const app = express();


const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();


module.exports.getMenu = async function (req, res) {
    const client = new Client(pgCUSR);
    client.connect();
    try {
        const query = `SELECT "CUSR".getMenu();`;
        const { rows, rowCount } = await client.query(query);
        client.end();
        if (rowCount > 0) {
            res.json(rows[0]["getmenu"]);
        } else {
            res.status(404).send('No data found');
        }
        //res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};





