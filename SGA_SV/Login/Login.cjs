const express = require("express");
//const oracledb = require("oracledb");
const { Client } = require("pg");
const app = express();


const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();


module.exports.getLogin = async function (req, res) {
    const Emp_ID = req.query.Emp_ID;
    const client = new Client(pgCUSR);
    try {
        client.connect();
        const query = `select * from "CUSR".getuser_byempid($1)`;
        const { rows, rowCount } = await client.query(query, [Emp_ID]);
        client.end();
        if (rowCount > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No data found for the provided EmpID_id.');
        }
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};


module.exports.insert_update_factory = async function (req, res) { //Call Procedure in put jsonList
    const client = new Client(pgCUSR);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "CUSR".insert_update_factory($1, $2)`;
        const result = await client.query(query, [requestData, p_error]);
        p_error = result.rows[0].p_error;
        client.end();
        if (p_error !== '') {
            res.status(404).send(p_error);
        } else {
            res.status(200).send('');
        }

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.insert_update_factory_stc = async function (req, res) { //Call Procedure in put json
    const client = new Client(pgCUSR);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "CUSR".insert_update_factory_stc($1, $2)`;
        const result = await client.query(query, [requestData, p_error]);
        p_error = result.rows[0].p_error;
        client.end();
        if (p_error !== '') {
            res.status(404).send(p_error);
        } else {
            res.status(200).send('');
        }

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};



