import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Advisor_Fn() {
    const [loading, setloading] = useState(false);
    const [countAdvisor, setcountAdvisor] = useState(null);
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

    const statusList = [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]

    const [advisorList, setadvisorList] = useState([]);

    const GetAdvisor = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataAdvisor?P_SGA_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setcountAdvisor(data.length);
                setadvisorList(data);
            } else {
                setcountAdvisor(0);
                setadvisorList([{ id: 1, sgamg_no: SGOno, sgamg_manager: ' ', sgamg_user: ' ', sgamg_manager_name: ' ', sgamg_status: { value: 'Active', label: 'Active' }, sgamg_sort: 0 }])
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };


    const addAdvisor = () => {
        if (advisorList.some(item => item.sgamg_manager_name === ' ' || item.sgamg_manager_name === '' || item.sgamg_manager_name === null)) {
            alert('Please enter the correct employee code.');
        } else {
            setadvisorList([...advisorList, { id: advisorList[advisorList.length - 1].id + 1, sgamg_no: localStorage.getItem('SGAno'), sgamg_manager: ' ', sgamg_user: ' ', sgamg_manager_name: '', sgamg_status: { value: 'Active', label: 'Active' }, sgamg_sort: advisorList.length }]);
        }
    };

    const handleChangeDetail = (id, field, value) => {
        setadvisorList(advisorList.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
        
        if (field === 'sgamg_manager' && value.trim().length === 7) {
            GetDataUser(id, value.trim(), localStorage.getItem('SGAno'), 'A')
        } else {
            setadvisorList(advisorList.map(row =>
                row.id === id ? { ...row, ['sgamg_manager']: value, ['sgamg_user']: ' ', ['sgamg_manager_name']: ' ' } : row
            ));
        }
    };

    const handleChangeDetailDropDown = (id, field, valueSelect) => {
        setadvisorList(advisorList.map(row =>
            row.id === id ? { ...row, [field]: { value: valueSelect.value, label: valueSelect.label } } : row
        ));
    };
    const [dataUser, setdataUser] = useState([]);
    const GetDataUser = async (id, EMPID, SGANO, STATUS) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataUser?P_EMP_ID=${EMPID}&P_SGA_NO=${SGANO}&P_STS=${STATUS}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;

            if (data.length > 0) {

                if (data[0]["sgamg_position"] === 'TP1' || data[0]["sgamg_position"] === 'TP2' || data[0]["sgamg_position"] === 'TL1' || data[0]["sgamg_position"] === 'TL2' || data[0]["sgamg_position"] === 'TSL') {
                    setadvisorList(advisorList.map(row =>
                        row.id === id ? { ...row, ['sgamg_manager']: data[0]["sgamg_manager"], ['sgamg_user']: data[0]["sgamg_user"], ['sgamg_manager_name']: data[0]["sgamg_manager_name"] } : row
                    ));
                } else {
                    alert("This employee cannot be a advisor.");
                }

            }
            else {
                alert("The employee code is invalid or the manager does not take care of this cost center.")
                setadvisorList(advisorList.map(row =>
                    row.id === id ? { ...row, ['sgamg_manager']: '', ['sgamg_user']: ' ', ['sgamg_manager_name']: ' ' } : row
                ));
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const delAdvisor = async (id) => {
        const filteredadvisor = advisorList.filter(item => item.id !== id);
        const updatedRecords = filteredadvisor.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        setadvisorList(updatedRecords)
        console.log(id, updatedRecords)
    };

    const OnSave = async () => {
        if (advisorList[advisorList.length - 1].sgamg_manager_name === null || advisorList[advisorList.length - 1].sgamg_manager_name === '' || advisorList[advisorList.length - 1].sgamg_manager_name === ' ') {
            alert('Please fill in last person employee id advisor.')
        } else {
            setloading(true);
            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/del_insert_Advisor?P_SGA_NO=${localStorage.getItem('SGAno')}`, advisorList,
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
                    GetAdvisor(localStorage.getItem('SGAno'));
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
        GetAdvisor(localStorage.getItem('SGAno'));
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
                    window.location.href=`/SGASystem/Transaction?txtHeader=${localStorage.getItem("TitleHeader")}&txtSubHeader=${localStorage.getItem("TitleSubHeader")}&txtStatus=${localStorage.getItem("StatusCode")}&txtType=${localStorage.getItem("ReqType")}&txtAction=${localStorage.getItem("ReqAction")}`;

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
        countAdvisor,
        setcountAdvisor,
        statusList,
        advisorList,
        setadvisorList,
        addAdvisor,
        handleChangeDetail,
        handleChangeDetailDropDown,
        GetHeader,
        STC_Header,
        GetAdvisor,
        OnSave,
        OnReset,
        delAdvisor,
        OnSendToResult
    }
}

export { Advisor_Fn }