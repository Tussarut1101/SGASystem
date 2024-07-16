import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Activity_Fn() {
    const [loading, setloading] = useState(false);

    const [STC_Header, setSTC_Header] = useState({
        P_SGA_NO: '',
        P_STATUS: '',
        P_STATUS_DESC: '',
        P_SGA_FLAG: false
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
                    P_SGA_FLAG: data[0]["p_sga_flag"]
                });


            } else {
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const [MonthList, setMonthList] = useState([]);
    const GetMonth = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getMonthMonitor?P_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            setMonthList(data);
        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const [ActList, setActList] = useState([]);
    const GetActivity = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataActivity?P_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setActList(data);
            } else {
                setActList([{ id: 1, 
                              p_sga_no: SGOno, 
                              p_sga_seq: 1, 
                              p_sga_subject: ' ', 
                              p_month_es_1: ' ',
                              p_month_ac_1: ' ',
                              p_month_sts_1: ' ',
                              p_month_es_2: ' ',
                              p_month_ac_2: ' ',
                              p_month_sts_2: ' ',
                              p_month_es_3: ' ',
                              p_month_ac_3: ' ',
                              p_month_sts_3: ' ',
                              p_month_es_4: ' ',
                              p_month_ac_4: ' ',
                              p_month_sts_4: ' ',
                              p_month_es_5: ' ',
                              p_month_ac_5: ' ',
                              p_month_sts_5: ' ',
                              p_month_es_6: ' ',
                              p_month_ac_6: ' ',
                              p_month_sts_6: ' '}])
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };


    const addActivity = () => {
        if (ActList.some(item => item.p_sga_subject === ' ' || item.p_sga_subject === '' || item.p_sga_subject === null)) {
            alert('Please enter the correct activity.');
        } else {
            setActList([...ActList, { id: ActList[ActList.length - 1].id + 1, 
                p_sga_no: localStorage.getItem('SGAno'), 
                p_sga_seq: ActList[ActList.length - 1].p_sga_seq + 1, 
                p_sga_subject: ' ', 
                p_month_es_1: ' ',
                p_month_ac_1: ' ',
                p_month_sts_1: ' ',
                p_month_es_2: ' ',
                p_month_ac_2: ' ',
                p_month_sts_2: ' ',
                p_month_es_3: ' ',
                p_month_ac_3: ' ',
                p_month_sts_3: ' ',
                p_month_es_4: ' ',
                p_month_ac_4: ' ',
                p_month_sts_4: ' ',
                p_month_es_5: ' ',
                p_month_ac_5: ' ',
                p_month_sts_5: ' ',
                p_month_es_6: ' ',
                p_month_ac_6: ' ',
                p_month_sts_6: ' '}])
        }
    };

    const handleChangeDetail = (id, field, value) => {
        setActList(ActList.map(row =>
            row.id === id ? { ...row, [field]: value.trim() } : row
        ));
    };


    const delActivity = async (id) => {
        const filteredmember = ActList.filter(item => item.id !== id);
        const updatedRecords = filteredmember.map((item, index) => ({
            ...item,
            id: index + 1,

        }));
        setActList(updatedRecords)
    };

    const OnSave = async () => {
        if ((ActList.length > 1) && (ActList[ActList.length - 1].p_sga_subject === null || ActList[ActList.length - 1].p_sga_subject === '' || ActList[ActList.length - 1].p_sga_subject === ' ')) {
            alert('Please enter the correct monitor detail.')
        } else {
            setloading(true);
            let STC_SAVE = [];
            if (ActList.length > 1){
                ActList.map((item, index) => {
                    STC_SAVE.push({
                        P_SGA_NO: item.p_sga_no,
                        P_SGA_SEQ: index+1,
                        P_SGA_SUBJECT: item.p_sga_subject.trim(),
                        P_RECORD_DETAIL: MonthList.map((itemM, indexM) => ({ P_SGA_PERIOD: indexM + 1, P_SGA_ESTIMATE: item[`p_month_es_${indexM + 1}`].trim(), P_SGA_ACTUAL: item[`p_month_ac_${indexM + 1}`].trim(), P_SGA_STATUS: item[`p_month_sts_${indexM + 1}`].trim() }))
                    })
                });
            }else{
                if (ActList[ActList.length - 1].p_sga_subject === null || ActList[ActList.length - 1].p_sga_subject === '' || ActList[ActList.length - 1].p_sga_subject === ' '){
                    STC_SAVE = []
                }else{
                    ActList.map((item, index) => {
                        STC_SAVE.push({
                            P_SGA_NO: item.p_sga_no,
                            P_SGA_SEQ: index+1,
                            P_SGA_SUBJECT: item.p_sga_subject.trim(),
                            P_RECORD_DETAIL: MonthList.map((itemM, indexM) => ({ P_SGA_PERIOD: indexM + 1, P_SGA_ESTIMATE: item[`p_month_es_${indexM + 1}`].trim(), P_SGA_ACTUAL: item[`p_month_ac_${indexM + 1}`].trim(), P_SGA_STATUS: item[`p_month_sts_${indexM + 1}`].trim() }))
                        })
                    });
                }
            }
            console.log(STC_SAVE)

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/delActivity?P_NO=${localStorage.getItem('SGAno')}`, STC_SAVE,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (response.status === 200) {
                    GetHeader(localStorage.getItem('SGAno'));
                    GetMonth(localStorage.getItem('SGAno'));
                    GetActivity(localStorage.getItem('SGAno'));
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
        }

    };

    const OnReset = async () => {
        setloading(true);
        GetActivity(localStorage.getItem('SGAno'));
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


    return {
        loading,
        setloading,
        STC_Header,
        GetHeader,
        setSTC_Header,
        ActList,
        GetActivity,
        addActivity,
        handleChangeDetail,
        delActivity,
        OnSave,
        OnReset,
        OnSendToResult,
        MonthList,
        GetMonth
    }
}

export { Activity_Fn }