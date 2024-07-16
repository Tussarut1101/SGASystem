const express = require("express");
const { Client } = require("pg");
const app = express();


const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();


module.exports.getJobs = async function (req, res) {
    const Emp_ID = req.query.Emp_ID;
    const client = new Client(pgGC);
    try {
        client.connect();

        const query = `select * from "GC".sga_getjobs($1)`;
        const { rows, rowCount } = await client.query(query, [Emp_ID]);
        client.end();
        if (rowCount > 0) {
            res.json(rows);
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





