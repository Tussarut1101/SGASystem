const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3080;
const serverLogin = require("./Login/Login.cjs");
const serverHome = require("./Login/Home.cjs");
const serverHeader = require("./Page/Header.cjs");
const serverCMD = require("./Common/cmd.cjs");
const serverTransaction = require("./Transaction/Transaction.cjs");
const serverMaster = require("./Master/Master.cjs");
const serverReport = require("./Report/Result.cjs");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();



function checkBasicAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      return res.status(401).send('Authorization header is missing');
  }

  const [type, credentials] = authHeader.split(' ');

  if (type !== 'Basic' || !credentials) {
      return res.status(401).send('Invalid authorization header format');
  }

  const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf8');
  const [username, password] = decodedCredentials.split(':');

  // ตรวจสอบ username และ password ที่ได้รับจาก Basic Auth
  if (username !== process.env.BASIC_AUTHORIZATION_USER || password !== process.env.BASIC_AUTHORIZATION_PASS) {
      return res.status(401).send('Invalid credentials');
  }

  next();
}
app.use(cors());
app.use(checkBasicAuth);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader('Content-Type', 'application/json');
  next();
});


// const client = new Client(pgCUSR, pgGC);
// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
//   })
//   .catch(err => {
//     console.error('Unable to connect to PostgreSQL:', err);
//   });

// //menuname
// app.get("/current-date", serverMenu.getCurrentDate);
// app.post("/MenuName", serverMenu.Menuname);



app.get("/common/getFactory", serverCMD.getFactory);
app.get("/common/getPeriodType", serverCMD.getPeriodType);
app.get("/common/getCostCenter", serverCMD.getCostCenter);
app.get("/common/getPeriodByYear", serverCMD.getPeriodByYear);

app.post("/common/SendMail", serverCMD.SendMail);

app.get("/login/LoginUser", serverLogin.getLogin);
app.post("/login/insert_update_factory", serverLogin.insert_update_factory);
app.post("/login/insert_update_factory_stc", serverLogin.insert_update_factory_stc);

app.get("/header/getMenu", serverHeader.getMenu);
app.get("/home/getJobs", serverHome.getJobs);

app.get("/transaction/getDataMain", serverTransaction.getDataMain);
app.get("/transaction/gettable_transactionMain", serverTransaction.gettable_transactionMain);
app.get("/transaction/getPeriod_Detail", serverTransaction.getPeriod_Detail);
app.get("/transaction/getCategory", serverTransaction.getCategory);
app.get("/transaction/getTargetDetail_FromMaster", serverTransaction.getTargetDetail_FromMaster);
app.get("/transaction/getTargetDetail_FromTrans", serverTransaction.getTargetDetail_FromTrans);
app.get("/transaction/getTargetMain_FromTrans", serverTransaction.getTargetMain_FromTrans);
app.get("/transaction/getResult_FromMaster", serverTransaction.getResult_FromMaster);
app.get("/transaction/getDataUser", serverTransaction.getDataUser);
app.get("/transaction/getDataRegister", serverTransaction.getDataRegister);
app.get("/transaction/getDataAdvisor", serverTransaction.getDataAdvisor);
app.get("/transaction/getDataMember", serverTransaction.getDataMember);
app.get("/transaction/getPlanResult", serverTransaction.getPlanResult);
app.get("/transaction/getResultDetail", serverTransaction.getResultDetail);
app.get("/transaction/getDataSendMail", serverTransaction.getDataSendMail);
app.get("/transaction/getDataTopic", serverTransaction.getDataTopic);
app.get("/transaction/getDataActivity", serverTransaction.getDataActivity);
app.get("/transaction/getMonthMonitor", serverTransaction.getMonthMonitor);

app.post("/transaction/MergHeader", serverTransaction.MergHeader);
app.post("/transaction/MergTargetDetail", serverTransaction.MergTargetDetail);
app.post("/transaction/del_insert_Advisor", serverTransaction.del_insert_Advisor);
app.post("/transaction/del_insert_Member", serverTransaction.del_insert_Member);
app.post("/transaction/del_TargetDetail", serverTransaction.del_TargetDetail);
app.post("/transaction/MergPlanResult", serverTransaction.MergPlanResult);
app.post("/transaction/upStatusHeader", serverTransaction.upStatusHeader);
app.post("/transaction/upResultByPeriod", serverTransaction.upResultByPeriod);
app.post("/transaction/upCommentResult", serverTransaction.upCommentResult);
app.post("/transaction/del_transaction", serverTransaction.del_transaction);
app.post("/transaction/insertTopic", serverTransaction.insertTopic);
app.post("/transaction/insertActivity", serverTransaction.insertActivity);
app.post("/transaction/delTopic", serverTransaction.delTopic);
app.post("/transaction/delActivity", serverTransaction.delActivity);


app.get("/master/getPeriodMain", serverMaster.getPeriodMain);
app.get("/master/getPeriodDetail", serverMaster.getPeriodDetail);

app.get("/master/getCategoryMain", serverMaster.getCategoryMain);
app.get("/master/getCategoryDetailHead", serverMaster.getCategoryDetailHead);
app.get("/master/getCategoryDetailSubHead", serverMaster.getCategoryDetailSubHead);
app.get("/master/getCategoryDetail", serverMaster.getCategoryDetail);

app.post("/master/MergePeriodMaster", serverMaster.MergePeriodMaster);
app.post("/master/del_PeriodMaster", serverMaster.del_PeriodMaster);

app.post("/master/MergeCategoryHead", serverMaster.MergeCategoryHead);
app.post("/master/MergeCategoryDetail", serverMaster.MergeCategoryDetail);
app.post("/master/del_CategoryMaster", serverMaster.del_CategoryMaster);

app.get("/report/getResultHead_RPT", serverReport.getResultHead_RPT);
app.get("/report/getResultDetail_RPT", serverReport.getResultDetail_RPT);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});