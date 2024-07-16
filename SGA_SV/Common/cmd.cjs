const express = require("express");
const { Client } = require("pg");
const app = express();
const connectToDatabase = require('./darabase.cjs');
const { pgCUSR, pgGC } = connectToDatabase();
const nodemailer = require('nodemailer');

module.exports.getFactory = async function (req, res) {
    const Emp_ID = req.query.Emp_ID;
    const client = new Client(pgCUSR);
    try {
        client.connect();
        const query = `select * from "CUSR".get_factory()`;
        const { rows, rowCount } = await client.query(query);
        client.end();
        if (rowCount > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No data found');
        }
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getPeriodType = async function (req, res) {
    const Emp_ID = req.query.Emp_ID;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_period_type()`;
        const { rows, rowCount } = await client.query(query);
        client.end();
        if (rowCount > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No data found');
        }
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getCostCenter = async function (req, res) {
    const Emp_ID = req.query.Emp_ID;
    const client = new Client(pgCUSR);
    try {
        client.connect();
        const query = `select * from "CUSR".get_costcenter()`;
        const { rows, rowCount } = await client.query(query);
        client.end();
        if (rowCount > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No data found');
        }
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getPeriodByYear = async function (req, res) {
    const P_YEAR = req.query.P_YEAR;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_period_by_year($1)`;
        const { rows } = await client.query(query, [P_YEAR]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.SendMail = async function (req, res) {
    // const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: '10.17.220.200',  // Replace with your SMTP server IP
        port: 25,              // Replace with your SMTP server port
        secure: false,         // true for 465, false for other ports
        // No auth required
    });
    try {
        const mailOptions = {
            from: req.body.MailFrom,
            to: req.body.MailTo,
            subject: req.body.MailSubject,
            html: req.body.MailMessage
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('');
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).send({ error: error.message });
    }

};
