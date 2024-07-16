import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Monitor_Fn() {
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

    const [MonitorList, setMonitorList] = useState([]);
    const GetMonitoring = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataTopic?P_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setMonitorList(data);
            } else {
                setMonitorList([{ id: 1, p_sga_no: SGOno, p_sga_seq: 1, p_sga_title: ' ', p_sga_unit: ' ', p_month_1: 0, p_month_2: 0, p_month_3: 0, p_month_4: 0, p_month_5: 0, p_month_6: 0 }])
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };


    const addMonitor = () => {
        if (MonitorList.some(item => item.p_sga_title === ' ' || item.p_sga_title === '' || item.p_sga_title === null)) {
            alert('Please enter the correct monitor detail.');
        } else {
            setMonitorList([...MonitorList, { id: MonitorList[MonitorList.length - 1].id + 1, p_sga_no: localStorage.getItem('SGAno'), p_sga_seq: MonitorList[MonitorList.length - 1].p_sga_seq + 1, p_sga_title: ' ', p_sga_unit: ' ', p_month_1: 0, p_month_2: 0, p_month_3: 0, p_month_4: 0, p_month_5: 0, p_month_6: 0 }])
        }
    };

    const handleChangeDetail = (id, field, value) => {
        if (field.includes('p_month')) {
            if (/^-?\d*\.?\d*$/.test(value)) {
                setMonitorList(MonitorList.map(row =>
                    row.id === id ? { ...row, [field]: value.trim() } : row
                ));
            }
        } else {
            setMonitorList(MonitorList.map(row =>
                row.id === id ? { ...row, [field]: value.trim() } : row
            ));
        }


    };


    const delDetail = async (id) => {
        const filteredmember = MonitorList.filter(item => item.id !== id);
        const updatedRecords = filteredmember.map((item, index) => ({
            ...item,
            id: index + 1,

        }));
        setMonitorList(updatedRecords)
    };

    const OnSave = async () => {
        if ((MonitorList.length > 1) && (MonitorList[MonitorList.length - 1].p_sga_title === null || MonitorList[MonitorList.length - 1].p_sga_title === '' || MonitorList[MonitorList.length - 1].p_sga_title === ' ')) {
            alert('Please enter the correct monitor detail.')
        } else {
            setloading(true);
            let STC_SAVE = [];
            if (MonitorList.length > 1){
                MonitorList.map((item, index) => {
                    STC_SAVE.push({
                        P_SGA_NO: item.p_sga_no,
                        P_SGA_SEQ: index+1,
                        P_SGA_TITLE: item.p_sga_title.trim(),
                        P_SGA_UNIT: item.p_sga_unit.trim(),
                        P_RECORD_DETAIL: MonthList.map((itemM, indexM) => ({ P_SGA_PERIOD: indexM + 1, P_SGA_DETAIL: item[`p_month_${indexM + 1}`].trim() }))
    
                    })
                });
            }else{
                if (MonitorList[MonitorList.length - 1].p_sga_title === null || MonitorList[MonitorList.length - 1].p_sga_title === '' || MonitorList[MonitorList.length - 1].p_sga_title === ' '){
                    STC_SAVE = []
                }else{
                    MonitorList.map((item, index) => {
                        STC_SAVE.push({
                            P_SGA_NO: item.p_sga_no,
                            P_SGA_SEQ: index + 1,
                            P_SGA_TITLE: item.p_sga_title,
                            P_SGA_UNIT: item.p_sga_unit,
                            P_RECORD_DETAIL: MonthList.map((itemM, indexM) => ({ P_SGA_PERIOD: indexM + 1, P_SGA_DETAIL: item[`p_month_${indexM + 1}`].trim() }))
        
                        })
                    });
                }
            }
            

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/delTopic?P_NO=${localStorage.getItem('SGAno')}`, STC_SAVE,
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
                    GetMonitoring(localStorage.getItem('SGAno'));
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
        GetMonitoring(localStorage.getItem('SGAno'));
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
        MonitorList,
        GetMonitoring,
        addMonitor,
        handleChangeDetail,
        delDetail,
        OnSave,
        OnReset,
        OnSendToResult,
        MonthList,
        GetMonth
    }
}

export { Monitor_Fn }