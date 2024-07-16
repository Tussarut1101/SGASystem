const express = require("express");
const { Client } = require("pg");
const app = express();

const connectToDatabase = require('../Common/darabase.cjs');

const { pgCUSR, pgGC } = connectToDatabase();

module.exports.getDataMain = async function (req, res) {
    const P_STATUS = req.query.P_STATUS;
    const P_EMPID = req.query.P_EMPID;
    const P_FACTORY = req.query.P_FACTORY;
    const P_SGANO_FRM = req.query.P_SGANO_FRM;
    const P_SGANO_TO = req.query.P_SGANO_TO;
    const P_CREATE_FRM = req.query.P_CREATE_FRM;
    const P_CREATE_TO = req.query.P_CREATE_TO;
    const P_PATHFORM = req.query.P_PATHFORM;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_data_main($1, $2, $3, $4, $5, $6, $7, $8)`;
        const { rows } = await client.query(query, [P_STATUS, P_EMPID, P_FACTORY, P_SGANO_FRM, P_SGANO_TO, P_CREATE_FRM, P_CREATE_TO,P_PATHFORM]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.gettable_transactionMain = async function (req, res) {
    const client = new Client(pgGC);
    client.connect();
    try {
        const query = `SELECT "GC".sga_gentable_transactionmain();`;
        const { rows, rowCount } = await client.query(query);
        client.end();
        if (rowCount > 0) {
            res.json(rows[0]["sga_gentable_transactionmain"]);
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


module.exports.getPeriod_Detail = async function (req, res) {
    const P_YEAR = req.query.P_YEAR;
    const P_PERIOD_CODE = req.query.P_PERIOD_CODE;

    const client = new Client(pgGC);
    try {
        client.connect();

        const query = `select * from "GC".sga_getperioddetail($1, $2)`;
        const { rows, rowCount } = await client.query(query, [P_YEAR, P_PERIOD_CODE]);
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

module.exports.getCategory = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_category()`;
        const { rows } = await client.query(query);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getTargetDetail_FromMaster = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_SEQ = req.query.P_SEQ;
    const P_TYPE_CODE = req.query.P_TYPE_CODE;
    const P_SUBJECT = req.query.P_SUBJECT.replace(/rrzzrr/g, "'").replace(/rrandrr/g, "&");
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_gettargetdetail_frommaster($1, $2, $3, $4);`;
        const { rows } = await client.query(query, [P_SGA_NO, P_SEQ, P_TYPE_CODE, P_SUBJECT]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getTargetDetail_FromTrans = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_SEQ = req.query.P_SEQ;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_gettargetdetail_fromtrans($1, $2);`;
        const { rows } = await client.query(query, [P_SGA_NO, P_SEQ]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getTargetMain_FromTrans = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_gettargetmain_fromtrans($1);`;
        const { rows } = await client.query(query, [P_SGA_NO]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getResult_FromMaster = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_getResult_fromMaster($1);`;
        const { rows } = await client.query(query, [P_SGA_NO]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getDataUser = async function (req, res) {
    const P_EMP_ID = req.query.P_EMP_ID;
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_STS = req.query.P_STS;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_datauserforsga($1, $2, $3);`;
        const { rows } = await client.query(query, [P_EMP_ID, P_SGA_NO, P_STS]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getDataRegister = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_register($1);`;
        const { rows, rowCount } = await client.query(query, [P_SGA_NO]);
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

module.exports.MergHeader = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_no = '';
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_mergheader($1, $2, $3)`;
        const result = await client.query(query, [requestData, p_no, p_error]);
        p_no = result.rows[0].p_no;
        p_error = result.rows[0].p_error;
        client.end();
        if (p_error !== '') {
            res.status(404).send(p_error);
        } else {
            res.status(200).send(p_no);
        }

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getDataAdvisor = async function (req, res) {
    const P_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_advisor($1);`;
        const { rows } = await client.query(query, [P_NO]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getDataMember = async function (req, res) {
    const P_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_member($1);`;
        const { rows } = await client.query(query, [P_NO]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.MergTargetDetail = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_merg_targetdetail($1, $2)`;
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

module.exports.del_insert_Advisor = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_del_insert_advisor($1, $2, $3)`;
        const result = await client.query(query, [P_SGA_NO, requestData, p_error]);
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

module.exports.del_insert_Member = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_del_insert_member($1, $2, $3)`;
        const result = await client.query(query, [P_SGA_NO, requestData, p_error]);
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

module.exports.del_TargetDetail = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_SEQ = req.query.P_SEQ;
    try {
        client.connect();
        let p_error = '';
        const query = `CALL "GC".sga_del_targetdetail($1, $2, $3)`;
        const result = await client.query(query, [P_SGA_NO, P_SEQ, p_error]);
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

module.exports.getPlanResult = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_plan_result($1);`;
        const { rows } = await client.query(query, [P_SGA_NO]);
        client.end();
        res.json(rows);
    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.MergPlanResult = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_merg_plan_result($1, $2)`;
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

module.exports.upStatusHeader = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_STATUS = req.query.P_STATUS;
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_up_status_header($1, $2, $3)`;
        const result = await client.query(query, [P_SGA_NO, P_STATUS, p_error]);
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

module.exports.getResultDetail = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_PERIOD_SEQ = req.query.P_PERIOD_SEQ;
    const P_SEQ = req.query.P_SEQ;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from  "GC".sga_get_resultdetail($1, $2, $3);`;
        const { rows, rowCount } = await client.query(query, [P_SGA_NO, P_PERIOD_SEQ, P_SEQ]);
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


module.exports.upResultByPeriod = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_PERIOD_SEQ = req.query.P_PERIOD_SEQ;
    const P_USER = req.query.P_USER;
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_up_result_byperiod($1, $2, $3, $4, $5)`;
        const result = await client.query(query, [requestData, P_SGA_NO, P_PERIOD_SEQ, P_USER, p_error]);
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

module.exports.upCommentResult = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_PERIOD_SEQ = req.query.P_PERIOD_SEQ;
    const P_STATUS = req.query.P_STATUS;
    const P_COMMENT = req.query.P_COMMENT;
    try {
        client.connect();
        let p_error = '';
        const query = `CALL "GC".sga_up_comment_result($1, $2, $3, $4, $5)`;
        const result = await client.query(query, [P_SGA_NO, P_PERIOD_SEQ, P_STATUS, P_COMMENT, p_error]);
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

module.exports.getDataSendMail = async function (req, res) {
    const P_SGA_NO = req.query.P_SGA_NO;
    const P_COMMENT = req.query.P_COMMENT;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_data_sendmail($1, $2)`;
        const { rows } = await client.query(query, [P_SGA_NO, P_COMMENT]);
        client.end();
        res.json(rows[0]['sga_get_data_sendmail']);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.del_transaction = async function (req, res) {
    const client = new Client(pgGC);
    const P_SGA_NO = req.query.P_SGA_NO;
    try {
        client.connect();
        let p_error = '';
        const query = `CALL "GC".sga_del_transaction($1, $2)`;
        const result = await client.query(query, [P_SGA_NO, p_error]);
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

module.exports.getDataTopic = async function (req, res) {
    const P_NO = req.query.P_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_trans_topic($1)`;
        const { rows } = await client.query(query, [P_NO]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.getDataActivity = async function (req, res) {
    const P_NO = req.query.P_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_trans_activity($1)`;
        const { rows } = await client.query(query, [P_NO]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};

module.exports.insertTopic = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_insert_trans_topic($1, $2)`;
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

module.exports.insertActivity = async function (req, res) {
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_insert_trans_activity($1, $2)`;
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

module.exports.delTopic = async function (req, res) {
    const P_NO = req.query.P_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_del_trans_topic($1, $2, $3)`;
        const result = await client.query(query, [P_NO, requestData, p_error]);
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

module.exports.delActivity = async function (req, res) {
    const P_NO = req.query.P_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        let p_error = '';
        const requestData = JSON.stringify(req.body);
        const query = `CALL "GC".sga_del_trans_activity($1, $2, $3)`;
        const result = await client.query(query, [P_NO, requestData, p_error]);
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

module.exports.getMonthMonitor = async function (req, res) {
    const P_NO = req.query.P_NO;
    const client = new Client(pgGC);
    try {
        client.connect();
        const query = `select * from "GC".sga_get_month_monitor($1)`;
        const { rows } = await client.query(query, [P_NO]);
        client.end();
        res.json(rows);

    } catch (error) {
        client.end();
        console.error("Error querying PostgreSQL:", error.message);
        res.status(500).send({ error: error.message });
    }
};