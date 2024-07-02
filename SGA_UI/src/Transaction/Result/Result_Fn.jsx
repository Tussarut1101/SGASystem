import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Result_Fn() {
    const [loading, setloading] = useState(false);
    const [isSendApprove, setisSendApprove] = useState(Boolean);
    const [countPeriod, setcountPeriod] = useState(null);
    const [STC_Header, setSTC_Header] = useState({
        P_SGA_NO: '',
        P_STATUS: '',
        P_STATUS_DESC: '',
        P_PERIOD: '',
        P_SGA_FLAG: false,
        P_TARGET_CHANGE: '',
        P_PLAN_COST: 0.00
    });

    const GetHeader = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataRegister?P_SGA_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {

                setSTC_Header({
                    P_SGA_NO: data[0]["p_sga_no"],
                    P_STATUS: data[0]["p_status"],
                    P_STATUS_DESC: data[0]["p_status_desc"],
                    P_PERIOD: data[0]["p_period"],
                    P_SGA_FLAG: data[0]["p_sga_flag"],
                    P_TARGET_CHANGE: data[0]["p_target_change"],
                    P_PLAN_COST: data[0]["p_plan_cost"]
                });


            } else {
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const [planList, setplanList] = useState([]);
    const GetPlanResult = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getPlanResult?P_SGA_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setplanList(data);
            } else {
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const checkSenApprove = async () => {
        setisSendApprove(false)
        planList.forEach((item) => {
            if (item.sgare_period_seq === 1 && (STC_Header.P_STATUS === 'S40' || STC_Header.P_STATUS === 'S60N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            } else if (item.sgare_period_seq === 2 && (STC_Header.P_STATUS === 'S60' || STC_Header.P_STATUS === 'S80N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            } else if (item.sgare_period_seq === 3 && (STC_Header.P_STATUS === 'S80' || STC_Header.P_STATUS === 'S100N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            } else if (item.sgare_period_seq === 4 && (STC_Header.P_STATUS === 'S100' || STC_Header.P_STATUS === 'S120N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            } else if (item.sgare_period_seq === 5 && (STC_Header.P_STATUS === 'S120' || STC_Header.P_STATUS === 'S140N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            } else if (item.sgare_period_seq === 6 && (STC_Header.P_STATUS === 'S140' || STC_Header.P_STATUS === 'S160N') && item.sgare_modify_by !== null && item.sgare_modify_by.trim() !== '') {
                setisSendApprove(true)
            }
        })
    };

    const handleChangeDetail = (id, field, value) => {
        setplanList(planList.map(row =>
            row.sgare_period_seq === id ? { ...row, [field]: value } : row
        ));
    };



    const OnSave = async () => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/transaction/MergPlanResult`, planList,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                GetHeader(localStorage.getItem('SGAno'));
                GetPlanResult(localStorage.getItem('SGAno'));
                setloading(false)
                alert("Save completed.")
            } else {
                setloading(false);
                alert(data);
            }


        } catch (error) {
            setloading(false);
            alert(error.message);
        }
    };

    const OnReset = async () => {
        setloading(true);
        GetPlanResult(localStorage.getItem('SGAno'));
        setloading(false);
    };

    const OnSendToResult = async () => {
        let str_STATUS = 'S40';
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/transaction/upStatusHeader?P_SGA_NO=${localStorage.getItem('SGAno')}&P_STATUS=${str_STATUS}`, null,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                setloading(false)
                window.location.href = `/SGASystem/Transaction?txtHeader=${localStorage.getItem("TitleHeader")}&txtSubHeader=${localStorage.getItem("TitleSubHeader")}&txtStatus=${localStorage.getItem("StatusCode")}&txtType=${localStorage.getItem("ReqType")}&txtAction=${localStorage.getItem("ReqAction")}`;

            } else {
                setloading(false);
                alert(data);
            }


        } catch (error) {
            setloading(false);
            alert(error.message);
        }
    };



    const [STC_SHOW_HEAD, setSTC_SHOW_HEAD] = useState({
        R_OPEN: false,
        R_EVEN: '',
        R_PERIOD: 0,
        R_SDATE: '',
        R_EDATE: '',
        R_COST: 0
    });
    const OnOpenResult = async (even, period, sdate, edate, costplan) => {
        GetresultDetai(localStorage.getItem('SGAno'), period, 1)
        setSTC_SHOW_HEAD({
            R_OPEN: true,
            R_EVEN: even,
            R_PERIOD: period,
            R_SDATE: sdate,
            R_EDATE: edate,
            R_COST: costplan
        });

    };

    const OnResetResult = async (period) => {
        setloading(true);
        GetresultDetai(localStorage.getItem('SGAno'), period, 1)
        setloading(false);
    };



    const OnCloseResult = async () => {
        setSTC_SHOW_HEAD({
            R_OPEN: false,
            R_EVEN: '',
            R_PERIOD: 0,
            R_SDATE: '',
            R_EDATE: '',
            R_COST: 0
        });
    };

    const OnHideResult = (seq, field, value) => {
        setresultDetailList(resultDetailList.map(row =>
            row.sgap_seq === seq ? { ...row, [field]: value } : row
        ));
    };

    const handleChangeResult = (seq, type, code, field, costTarget, value) => {
        // setresultDetailList(resultDetailList.stc_trans_result_detail.map(row =>
        //     row.SGARED_SEQ === seq && row.SGARED_CODE === code ? { ...row, [field]: value } : row
        // ));
        if (isNaN(value)) {
            alert('Please fill in numeric type...')
        } else {
            let dC = 0;
            let dA = value;
            let dB = costTarget;
            let CodeTarget = '';

            setresultDetailList(resultDetailList.map(row =>
                row.sgap_seq === seq ? {
                    ...row, ['stc_trans_result_detail']: row.stc_trans_result_detail.map(rowD =>
                        rowD.SGARED_SEQ === seq && rowD.SGARED_CODE === code ? { ...rowD, [field]: value } : rowD
                    )
                } : row
            ));

            if (type === 'SGTY001' && code === 'SC001') {
                dC = (dA / dB) * 100;
                CodeTarget = 'SC003';
            } else if (type === 'SGTY002' && code === 'PC009') {
                dC = (dB / dA) * 100;
                CodeTarget = 'PC013';
            } else if (type === 'SGTY003' && code === 'PD001') {
                dC = (dA / dB) * 100;
                CodeTarget = 'PD013';
            } else if (type === 'SGTY004' && code === 'QT001') {
                dC = (dB / dA) * 100;
                CodeTarget = 'QT007';
            } else if (type === 'SGTY005' && code === 'SU001') {
                dC = (dB / dA) * 100;
                CodeTarget = 'SU003';
            } else {
                dC = 0;
                CodeTarget = '';
            }

            console.log(dC, CodeTarget);
            if (CodeTarget === '' || CodeTarget === ' ' || CodeTarget === null) {
                console.log(CodeTarget);
            } else {
                setresultDetailList(resultDetailList.map(row =>
                    row.sgap_seq === seq ? {
                        ...row, ['stc_trans_result_detail']: row.stc_trans_result_detail.map(rowD =>
                            rowD.SGARED_SEQ === seq && rowD.SGARED_CODE === code ? { ...rowD, [field]: value } :
                                rowD.SGARED_SEQ === seq && rowD.SGARED_CODE === CodeTarget ? { ...rowD, [field]: dC } :
                                    rowD
                        )
                    } : row
                ));

            }






        }

    };

    const [resultDetailList, setresultDetailList] = useState([]);
    const GetresultDetai = async (SGOno, period_seq, seq) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getResultDetail?P_SGA_NO=${SGOno}&P_PERIOD_SEQ=${period_seq}&P_SEQ=${seq}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setresultDetailList(data);
            } else {
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const OnSaveResult = async (period_seq) => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/transaction/upResultByPeriod?P_SGA_NO=${localStorage.getItem('SGAno')}&P_PERIOD_SEQ=${period_seq}&P_USER=${localStorage.getItem('emp_code')}`, resultDetailList,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                setloading(false)
                GetPlanResult(localStorage.getItem('SGAno'));
                alert("Save Result completed.")
            } else {
                setloading(false);
                alert(data);
            }

        } catch (error) {
            setloading(false);
            alert(error.message);
        }
    };

    const OnSendToMGR = async () => {
        let str_STATUS = '';
        if (STC_Header.P_STATUS === 'S40' || STC_Header.P_STATUS === 'S60N') {
            str_STATUS = 'S50';
        } else if (STC_Header.P_STATUS === 'S60' || STC_Header.P_STATUS === 'S80N') {
            str_STATUS = 'S70';
        } else if (STC_Header.P_STATUS === 'S80' || STC_Header.P_STATUS === 'S100N') {
            str_STATUS = 'S90';
        } else if (STC_Header.P_STATUS === 'S100' || STC_Header.P_STATUS === 'S120N') {
            str_STATUS = 'S110';
        } else if (STC_Header.P_STATUS === 'S120' || STC_Header.P_STATUS === 'S140N') {
            str_STATUS = 'S130';
        } else if (STC_Header.P_STATUS === 'S140' || STC_Header.P_STATUS === 'S160N') {
            str_STATUS = 'S150';
        }
        let calPlanPeriod = 0;
        planList.map(row => {
            calPlanPeriod += parseFloat(row.sgare_total_plan);
        });
        if (parseInt(calPlanPeriod) !== parseInt(STC_Header.P_PLAN_COST)) {
            alert('Please check target cost saving with action plan to make it equal.')
        } else {
            setloading(true);
            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/upStatusHeader?P_SGA_NO=${localStorage.getItem('SGAno')}&P_STATUS=${str_STATUS}`, null,
                    {
                        headers: {
                            // 'Content-Type': 'application/json',
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (response.status === 200) {
                    Sendmail(STC_Header.P_SGA_NO)
                    setloading(false)
                    window.location.href = `/SGASystem/Transaction?txtHeader=${localStorage.getItem("TitleHeader")}&txtSubHeader=${localStorage.getItem("TitleSubHeader")}&txtStatus=${localStorage.getItem("StatusCode")}&txtType=${localStorage.getItem("ReqType")}&txtAction=${localStorage.getItem("ReqAction")}`;

                } else {
                    setloading(false);
                    alert(data);
                }


            } catch (error) {
                setloading(false);
                alert(error.message);
            }
        }


    };

    const [STC_APPORRE, setSTC_APPORRE] = useState({
        P_SGA_NO: '',
        P_STATUS: '',
        P_PERIOD: 0,
        P_COMMENT: ''
    });

    const OnApproveOrReject = async (typeApp, Comment, Period) => {
        let str_STATUS = '';
        if (STC_Header.P_STATUS === 'S50') {
            if (typeApp === 'A') {
                str_STATUS = 'S60';
            } else {
                str_STATUS = 'S60N';
            }
        } else if (STC_Header.P_STATUS === 'S70') {
            if (typeApp === 'A') {
                str_STATUS = 'S80';
            } else {
                str_STATUS = 'S80N';
            }
        } else if (STC_Header.P_STATUS === 'S90') {
            if (typeApp === 'A') {
                str_STATUS = 'S100';
            } else {
                str_STATUS = 'S100N';
            }
        } else if (STC_Header.P_STATUS === 'S110') {
            if (typeApp === 'A') {
                str_STATUS = 'S120';
            } else {
                str_STATUS = 'S120N';
            }
        } else if (STC_Header.P_STATUS === 'S130') {
            if (typeApp === 'A') {
                str_STATUS = 'S140';
            } else {
                str_STATUS = 'S140N';
            }
        } else if (STC_Header.P_STATUS === 'S150') {
            if (typeApp === 'A') {
                str_STATUS = 'S160';
            } else {
                str_STATUS = 'S160N';
            }
        }

        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/transaction/upCommentResult?P_SGA_NO=${localStorage.getItem('SGAno')}&P_PERIOD_SEQ=${Period}&P_STATUS=${str_STATUS}&P_COMMENT=${Comment}`, null,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                Sendmail(STC_Header.P_SGA_NO)
                setloading(false)
                window.location.href = `/SGASystem/Transaction?txtHeader=${localStorage.getItem("TitleHeader")}&txtSubHeader=${localStorage.getItem("TitleSubHeader")}&txtStatus=${localStorage.getItem("StatusCode")}&txtType=${localStorage.getItem("ReqType")}&txtAction=${localStorage.getItem("ReqAction")}`;

            } else {
                setloading(false);
                alert(data);
            }


        } catch (error) {
            setloading(false);
            alert(error.message);
        }
    };

    const Sendmail = async (SGAno) => {
        setloading(true);
        let mFrom = '';
        let mTo = '';
        let mSubject = '';
        let mMessage = ``;

        try {

            const responseG = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataSendMail?P_SGA_NO=${SGAno}&P_COMMENT=`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const dataG = await responseG.data; 
            mFrom = dataG['SGA_MAIL_FRM'];
            mTo = dataG['SGA_MAIL_TO']; 
            mSubject = dataG['SGA_SUBJECT'];
            mMessage = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Email Form with Image Header</title>
                                <style>
                                    .header {
                                        color: #000000;
                                        padding: 20px;
                                        text-align: center;
                                        margin-left: 20%;
                                        margin-right: 20%;
                                        background-color: #ffffff;
                                        font-family: calibri Light;
                                    }
                                    .content {
                                        padding: 30px 30px 30px 30px;
                                        margin-left: 20%;
                                        margin-right: 20%;
                                        background-color: #ffffff;
                                        font-family: calibri Light;
                                        border-radius: 8px;
                                    }
                                    .contentSub {
                                        border: 1px solid #8b1e88;
                                        padding: 30px 30px 30px 30px;
                                        font-family: calibri Light;
                                        border-radius: 8px;
                                    }
                                    .contentDetail {
                                        display: flex;
                                        font-family: calibri Light;
                                        align-items: center;
                                    }
                                    .contentTitle {
                                        margin-right: 10px;
                                        font-size: 18px;
                                        align-items: center;
                                        
                                    }
                                    .contentInform {
                                        width: auto;
                                        font-size: 18px;
                                        align-items: center;
                                    }
                                    .footer {
                                        background-color: #ffffff;
                                        padding: 20px;
                                        text-align: center;
                                        margin-left: 20%;
                                        margin-right: 20%;
                                        font-family: calibri Light;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="header">
                                    <img src="data:image/png;base64,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" />
                                </div>
                                <div class="content">
                                <div class="contentSub">
                                    <h2>${mSubject}</h2>
                                    <div class="contentDetail">
                                        <div style="font-size: 24px; font-weight: bold;">Dear&nbsp;</div>
                                        <div class="contentInform">${dataG['SGA_DEAR']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle">SGA No. :</div>
                                        <div class="contentInform">${dataG['SGA_NO']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle"> Team :</div>
                                        <div class="contentInform">${dataG['SGA_TEAM']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle">Theme :</div>
                                        <div class="contentInform">${dataG['SGA_THEME']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle">Start Date - End Date :</div>
                                        <div class="contentInform">${dataG['SGA_START_DATE']} &nbsp; - &nbsp; ${dataG['SGA_END_DATE']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle">Target Cost saving(THB) : </div>
                                        <div class="contentInform">${dataG['SGA_PLAN']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle">Total Cost saving(THB) : </div>
                                        <div class="contentInform">${dataG['SGA_ACTUAL']}</div>
                                    </div>
                                    <div class="contentDetail">
                                        <div class="contentTitle"> Status : </div>
                                        <div class="contentInform">${dataG['SGA_STATUS']}</div>
                                    </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <p>© 2024 Fujikura Electronic Thailand Ltd, Co.</p>
                                </div>
                            </body>
                            </html>
                            `;

            const response = await axios.post(
                `${import.meta.env.VITE_API}/common/SendMail`,
                {
                    MailFrom: mFrom,
                    MailTo: mTo,
                    MailSubject: mSubject,
                    MailMessage: mMessage
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                setloading(false);
            } else {
                setloading(false);
                alert(data);
            }

        } catch (error) {
            setloading(false);
            alert(error.message);
        }
    };




    return {
        loading,
        setloading,
        countPeriod,
        setcountPeriod,
        STC_Header,
        setSTC_Header,
        GetHeader,
        planList,
        setplanList,
        GetPlanResult,
        handleChangeDetail,
        OnSave,
        OnReset,
        OnSendToResult,
        STC_SHOW_HEAD,
        setSTC_SHOW_HEAD,
        OnOpenResult,
        OnCloseResult,
        resultDetailList,
        OnHideResult,
        handleChangeResult,
        OnSaveResult,
        checkSenApprove,
        isSendApprove,
        OnSendToMGR,
        OnApproveOrReject,
        STC_APPORRE,
        setSTC_APPORRE,
        OnResetResult
    }
}

export { Result_Fn }