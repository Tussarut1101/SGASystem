const express = require("express");
const { Client } = require("pg");
const app = express();

const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();

module.exports.getResultHead_RPT = async function (req, res) {
    const P_FAC = req.query.P_FAC;
    const P_YEAR = req.query.P_YEAR;
    const P_SGA_NO_FRM = req.query.P_SGA_NO_FRM;
    const P_SGA_NO_TO = req.query.P_SGA_NO_TO;
    const P_TYPE = req.query.P_TYPE;
    const P_ISS_DATE_FRM = req.query.P_ISS_DATE_FRM;
    const P_ISS_DATE_TO = req.query.P_ISS_DATE_TO;
    const P_CC = req.query.P_CC;
    const P_EMP_FRM = req.query.P_EMP_FRM;
    const P_EMP_TO = req.query.P_EMP_TO;
    const P_START_DATE = req.query.P_START_DATE;
    const P_END_DATE = req.query.P_END_DATE;
    const P_TYPE_REPORT = req.query.P_TYPE_REPORT;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_result_rpt_hv2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
        const { rows } = await client.query(query, [P_FAC, P_YEAR, P_SGA_NO_FRM, P_SGA_NO_TO, P_TYPE, P_ISS_DATE_FRM, P_ISS_DATE_TO, P_CC, P_EMP_FRM, P_EMP_TO, P_START_DATE, P_END_DATE, P_TYPE_REPORT]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getResultDetail_RPT = async function (req, res) {
    const P_FAC = req.query.P_FAC;
    const P_YEAR = req.query.P_YEAR;
    const P_SGA_NO_FRM = req.query.P_SGA_NO_FRM;
    const P_SGA_NO_TO = req.query.P_SGA_NO_TO;
    const P_TYPE = req.query.P_TYPE;
    const P_ISS_DATE_FRM = req.query.P_ISS_DATE_FRM;
    const P_ISS_DATE_TO = req.query.P_ISS_DATE_TO;
    const P_CC = req.query.P_CC;
    const P_EMP_FRM = req.query.P_EMP_FRM;
    const P_EMP_TO = req.query.P_EMP_TO;
    const P_START_DATE = req.query.P_START_DATE;
    const P_END_DATE = req.query.P_END_DATE;
    const P_TYPE_REPORT = req.query.P_TYPE_REPORT;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_result_rpt_dv2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
        const { rows } = await client.query(query, [P_FAC, P_YEAR, P_SGA_NO_FRM, P_SGA_NO_TO, P_TYPE, P_ISS_DATE_FRM, P_ISS_DATE_TO, P_CC, P_EMP_FRM, P_EMP_TO, P_START_DATE, P_END_DATE, P_TYPE_REPORT]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};