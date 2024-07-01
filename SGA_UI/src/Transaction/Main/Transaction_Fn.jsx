import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Header } from 'antd/es/layout/layout';

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function GetFactory() {
    const [facList, setfacList] = useState([]);
    const FactoryList = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/common/getFactory`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
                    },
                });
            const data = await response.data;
            if (data.length > 0) {
                setfacList(data);
            } else {
                alert(data)
            }
        } catch (error) {
            console.error("Error Factory.", error);
            alert(error.message);
        }
    };
    return { FactoryList, facList }
}

function SearchData() {

    const [loading, setloading] = useState(false);
    const [selectedOptionFac, setSelectedOptionFac] = useState(null);

    const handleChangeFac = (event) => {
        setSelectedOptionFac(event);
    };

    const [selectedSGADateFrm, setselectedSGADateFrm] = useState(null);
    const handleDateChangeSGADateFrm = (event) => {
        setselectedSGADateFrm(event);
        setselectedSGADateTo(event);
    };

    const [selectedSGADateTo, setselectedSGADateTo] = useState(null);
    const handleDateChangeSGADateTo = (event) => {
        setselectedSGADateTo(event);
    };

    const [strSGANoFrm, settxtsganoFrm] = useState('');
    const [strSGANoTo, settxtsganoTo] = useState('');

    const [genHeaderTable, setHeaderTable] = useState([]);
    const [genDetailTable, setDetailTable] = useState([]);

    const GetData = async () => {
        setloading(true)
        let P_STATUS = localStorage.getItem("StatusCode");
        let P_EMPID = localStorage.getItem("emp_code");
        let P_FACTORY
        if (selectedOptionFac === null) {
            P_FACTORY = '0'
        }
        else {
            P_FACTORY = selectedOptionFac.value;
        }

        let P_SGANO_FRM;
        if (strSGANoFrm === null || strSGANoTo === '') {
            P_SGANO_FRM = '0'
        }
        else {
            P_SGANO_FRM = strSGANoFrm;
        }
        let P_SGANO_TO = strSGANoTo;
        if (strSGANoTo === null || strSGANoTo === '') {
            P_SGANO_TO = '0'
        }
        else {
            P_SGANO_TO = strSGANoTo;
        }

        let P_CREATE_FRM
        if (selectedSGADateFrm === null) {
            P_CREATE_FRM = '0'
        }
        else {
            P_CREATE_FRM = selectedSGADateFrm.getFullYear() + String(selectedSGADateFrm.getMonth() + 1).padStart(2, '0') + String(selectedSGADateFrm.getDate()).padStart(2, '0');
        }
        let P_CREATE_TO
        if (selectedSGADateFrm === null) {
            P_CREATE_TO = '0'
        }
        else {
            P_CREATE_TO = selectedSGADateTo.getFullYear() + String(selectedSGADateTo.getMonth() + 1).padStart(2, '0') + String(selectedSGADateTo.getDate()).padStart(2, '0');
        }

        // console.log(P_STATUS + '|' + P_EMPID + '|' + P_FACTORY + '|' + P_SGANO_FRM + '|' + P_SGANO_TO + '|' + P_CREATE_FRM + '|' + P_CREATE_TO);
        let P_PATHFORM = localStorage.getItem("ReqAction");
        try {
            const responseHead = await axios.get(
                `${import.meta.env.VITE_API}/transaction/gettable_transactionMain`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const dataHead = await responseHead.data;
            setHeaderTable(dataHead);
            console.log(genHeaderTable)
            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataMain?P_STATUS=${P_STATUS}&P_EMPID=${P_EMPID}&P_FACTORY=${P_FACTORY}&P_SGANO_FRM=${P_SGANO_FRM}&P_SGANO_TO=${P_SGANO_TO}&P_CREATE_FRM=${P_CREATE_FRM}&P_CREATE_TO=${P_CREATE_TO}&P_PATHFORM=${P_PATHFORM}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            setDetailTable(data)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const ResetValues = async () => {
        setloading(true)
        setSelectedOptionFac(null)
        settxtsganoFrm('')
        settxtsganoTo('')
        setselectedSGADateFrm(null)
        setselectedSGADateTo(null)
        setloading(false)
    };

    const NewPage = async (event, value, status) => {
        localStorage.setItem("SGAno", value)
        localStorage.setItem("StatusDesc", status)
        localStorage.setItem("ReqTypeAction", event)
        window.location.href = `/SGASystem/TransactionDetail?SGA_NO=${value}`;
    };



    return { handleChangeFac, selectedOptionFac, setSelectedOptionFac, handleDateChangeSGADateFrm, selectedSGADateFrm, handleDateChangeSGADateTo, selectedSGADateTo, GetData, strSGANoFrm, settxtsganoFrm, strSGANoTo, settxtsganoTo, genHeaderTable, genDetailTable, loading, setloading, ResetValues, NewPage }
}

export { GetFactory, SearchData }