const express = require("express");
const { Client } = require("pg");
const app = express();

const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();

module.exports.getPeriodMain = async function (req, res) {
    const P_YEAR = req.query.P_YEAR;
    const P_CODE = req.query.P_CODE;
    const P_STATUS = req.query.P_STATUS;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_period_main($1, $2, $3)`;
        const { rows } = await client.query(query, [P_YEAR, P_CODE, P_STATUS]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getPeriodDetail = async function (req, res) {
    const P_YEAR = req.query.P_YEAR;
    const P_CODE = req.query.P_CODE;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_period_detail($1, $2)`;
        const { rows } = await client.query(query, [P_YEAR, P_CODE]);
        client.end();
        res.json(rows[0]['sga_get_period_detail']);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.MergePeriodMaster = async function (req, res) {
    const client = new Client(pgGC);
    const P_USER = req.query.P_USER;
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_merge_period_master($1, $2, $3)`;
        const result = await client.query(query, [requestData, P_USER, p_error]);
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

module.exports.del_PeriodMaster = async function (req, res) {
    const client = new Client(pgGC);
    const P_YEAR = req.query.P_YEAR;
    const P_CODE = req.query.P_CODE;
    try {
        client.connect();
        let p_error = '';
        const query = `CALL "GC".sga_del_period_master($1, $2, $3)`;
        const result = await client.query(query, [P_YEAR, P_CODE, p_error]);
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

module.exports.getCategoryMain = async function (req, res) {
    const P_TYPE = req.query.P_TYPE;
    const P_STATUS = req.query.P_STATUS;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_category_main($1, $2)`;
        const { rows } = await client.query(query, [P_TYPE, P_STATUS]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getCategoryDetailHead = async function (req, res) {
    const client = new Client(pgGC);
    const P_TYPE = req.query.P_TYPE
    const P_USER = req.query.P_USER
    try {
        client.connect();
        const query = `select * from "GC".sga_get_category_detail_header($1, $2)`;
        const { rows } = await client.query(query,[P_TYPE, P_USER]);
        client.end();
        res.json(rows[0]['sga_get_category_detail_header'][0]);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getCategoryDetailSubHead = async function (req, res) {
    const client = new Client(pgGC);
    const P_TYPE = req.query.P_TYPE
    const P_CODE = req.query.P_CODE
    try {
        client.connect();
        const query = `select * from "GC".sga_get_category_detail_subheader($1, $2)`;
        const { rows } = await client.query(query,[P_TYPE, P_CODE]);
        client.end();
        res.json(rows[0]['sga_get_category_detail_subheader'][0]);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getCategoryDetail = async function (req, res) {
    const P_TYPE = req.query.P_TYPE;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_category_detail($1)`;
        const { rows } = await client.query(query, [P_TYPE]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.MergeCategoryHead = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_merge_category_master_head($1, $2)`;
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

module.exports.MergeCategoryDetail = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_merge_category_master_detail($1, $2)`;
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

module.exports.del_CategoryMaster = async function (req, res) {
    const client = new Client(pgGC);
    const P_TYPE = req.query.P_TYPE;
    const P_CODE = req.query.P_CODE;
    try {
        client.connect();
        let p_error = '';
        const query = `CALL "GC".sga_del_category_master($1, $2, $3)`;
        const result = await client.query(query, [P_TYPE, P_CODE, p_error]);
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