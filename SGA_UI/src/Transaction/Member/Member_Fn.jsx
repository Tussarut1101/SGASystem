import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Member_Fn() {
    const [loading, setloading] = useState(false);
    const [countMember, setcountMember] = useState(null);
    const statusList = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]

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

    const [memberList, setmemberList] = useState([]);
    const GetMember = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getDataMember?P_SGA_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setcountMember(data.length);
                setmemberList(data);
            } else {
                setcountMember(0);
                setmemberList([{ id: 1, sga_no: SGOno, mem_emp_id: localStorage.getItem('emp_code'), mem_name: localStorage.getItem('emp_name'), mem_cc: localStorage.getItem('emp_cc'), mem_user: localStorage.getItem('emp_user'), mem_update: { value: 'Yes', label: 'Yes' }, mem_leader: { value: 'Yes', label: 'Yes' }, mem_sort: 0 }])
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };


    const addMember = () => {
        if (memberList.some(item => item.mem_name === ' ' || item.mem_name === '' || item.mem_name === null)) {
            alert('Please enter the correct employee code.');
        } else {

            setmemberList([...memberList, { id: memberList[memberList.length - 1].id + 1, sga_no: localStorage.getItem('SGAno'), mem_emp_id: ' ', mem_name: ' ', mem_cc: ' ', mem_user: ' ', mem_update: { value: 'No', label: 'No' }, mem_leader: { value: 'No', label: 'No' }, mem_sort: memberList.length }]);

        }
    };

    const handleChangeDetail = (id, field, value) => {
        setmemberList(memberList.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));

        if (field === 'mem_emp_id' && value.trim().length === 7) {
            GetDataUser(id, value.trim(), localStorage.getItem('SGAno'), 'A')
        } else {
            setmemberList(memberList.map(row =>
                row.id === id ? { ...row, ['mem_emp_id']: value, ['mem_name']: ' ', ['mem_cc']: ' ', ['mem_user']: ' ' } : row
            ));
        }
    };

    const handleChangeDetailDropDown = (id, field, valueSelect) => {
        setmemberList(memberList.map(row =>
            row.id === id ? { ...row, [field]: { value: valueSelect.value, label: valueSelect.label } } : row
        ));
    };

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
                    alert("This employee level over member.");
                } else {
                    setmemberList(memberList.map(row =>
                        row.id === id ? { ...row, ['mem_emp_id']: data[0]["sgamg_manager"], ['mem_name']: data[0]["sgamg_manager_name"], ['mem_cc']: data[0]["sgamg_cc"], ['mem_user']: data[0]["sgamg_user"] } : row
                    ));
                }

            }
            else {
                alert("Employee ID is invalid or not in this cost center.")
                setmemberList(memberList.map(row =>
                    row.id === id ? { ...row, ['mem_emp_id']: '', ['mem_name']: ' ', ['mem_cc']: ' ', ['mem_user']: ' ' } : row
                ));

            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const delMem = async (id) => {
        const filteredmember = memberList.filter(item => item.id !== id);
        const updatedRecords = filteredmember.map((item, index) => ({
            ...item,
            id: index + 1,

        }));
        setmemberList(updatedRecords)
    };

    const OnSave = async () => {
        if (memberList[memberList.length - 1].mem_name === null || memberList[memberList.length - 1].mem_name === '' || memberList[memberList.length - 1].mem_name === ' ') {
            alert('Please fill in last person employee id member.')
        } else {
            setloading(true);
            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/del_insert_Member?P_SGA_NO=${localStorage.getItem('SGAno')}`, memberList,
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
                    GetMember(localStorage.getItem('SGAno'));
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
        GetMember(localStorage.getItem('SGAno'));
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
        countMember,
        setcountMember,
        statusList,
        memberList,
        setmemberList,
        addMember,
        handleChangeDetail,
        handleChangeDetailDropDown,
        GetHeader,
        STC_Header,
        GetMember,
        OnSave,
        OnReset,
        delMem,
        OnSendToResult
    }
}

export { Member_Fn }