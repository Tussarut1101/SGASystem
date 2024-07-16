import React, { useState, useEffect } from 'react';
import axios from "axios";

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

function GetPeriodType() {
    const [perTypeList, setperTypeList] = useState([]);
    const PeriodTypeList = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/common/getPeriodType`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
                    },
                });
            const data = await response.data;
            if (data.length > 0) {
                setperTypeList(data);
            } else {
                alert(data)
            }
        } catch (error) {
            console.error("Error Factory.", error);
            alert(error.message);
        }
    };
    return { PeriodTypeList, perTypeList }
}

function GetCostCenter() {
    const [ccList, setccList] = useState([]);
    const CostCenterList = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/common/getCostCenter`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
                    },
                });
            const data = await response.data;
            if (data.length > 0) {
                setccList(data);
            } else {
                alert(data)
            }
        } catch (error) {
            console.error("Error Factory.", error);
            alert(error.message);
        }
    };
    return { CostCenterList, ccList }
}

function Register_FN() {
    const [loading, setloading] = useState(false);
    const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
    const day = currentDate.getDate().toString().padStart(2, '0'); // รับวันที่และให้ตัวเลขอยู่ในรูปแบบ dd โดยใช้ padStart เพื่อเติม 0 หน้าเลขที่มีความยาวน้อยกว่า 2
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // รับเดือนและให้ตัวเลขอยู่ในรูปแบบ MM โดยใช้ padStart เพื่อเติม 0 หน้าเลขที่มีความยาวน้อยกว่า 2
    const year = currentDate.getFullYear(); // รับปี
    const [STC_Header, setSTC_Header] = useState({
        P_FACTORY: null,
        P_SGA_NO: '',
        P_STATUS: 'S10',
        P_STATUS_DESC: 'Create',
        P_PERIOD_TYPE: null,
        P_CC: null,
        P_TEAM: '',
        P_THEME: '',
        P_ADVISOR: '',
        P_MEMBER: '',
        P_PERIOD: null,
        P_START_DATE: '',
        P_END_DATE: '',
        P_PLAN_COST: 0.00,
        P_ACTUAL_COST: 0.00,
        P_MODIFY_BY: localStorage.getItem("emp_code"),
        P_MODIFY_DATE: `${day}/${month}/${year}`,
        P_YEAR: `${year}`,
        P_SGA_FLAG: false
    });

    const GetDataRegister = async (SGANO) => {
        if (SGANO === null || SGANO === '' || SGANO === ' ') {
            setSTC_Header({
                P_FACTORY: STC_Header.P_FACTORY,
                P_SGA_NO: '',
                P_STATUS: 'S10',
                P_STATUS_DESC: 'Create',
                P_PERIOD_TYPE: null,
                P_CC: null,
                P_TEAM: '',
                P_THEME: '',
                P_ADVISOR: '',
                P_MEMBER: '',
                P_PERIOD: null,
                P_START_DATE: '',
                P_END_DATE: '',
                P_PLAN_COST: 0.00,
                P_ACTUAL_COST: 0.00,
                P_MODIFY_BY: localStorage.getItem("emp_code"),
                P_MODIFY_DATE: `${day}/${month}/${year}`,
                P_YEAR: `${year}`,
                P_SGA_FLAG: false
            })
        }
        else {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API}/transaction/getDataRegister?P_SGA_NO=${SGANO}`,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (data.length > 0) {
                    setSTC_Header({
                        P_FACTORY: data[0]["p_factory"],
                        P_SGA_NO: data[0]["p_sga_no"],
                        P_STATUS: data[0]["p_status"],
                        P_STATUS_DESC: data[0]["p_status_desc"],
                        P_PERIOD_TYPE: data[0]["p_period_type"],
                        P_CC: data[0]["p_cc"],
                        P_TEAM: data[0]["p_team"],
                        P_THEME: data[0]["p_theme"],
                        P_ADVISOR: data[0]["p_advisor"],
                        P_MEMBER: data[0]["p_member"],
                        P_PERIOD: data[0]["p_period"],
                        P_START_DATE: data[0]["p_start_date"],
                        P_END_DATE: data[0]["p_end_date"],
                        P_PLAN_COST: data[0]["p_plan_cost"],
                        P_ACTUAL_COST: data[0]["p_actual_cost"],
                        P_MODIFY_BY: localStorage.getItem("emp_code"),
                        P_MODIFY_DATE: `${day}/${month}/${year}`,
                        P_YEAR: data[0]["p_year"],
                        P_SGA_FLAG: data[0]["p_sga_flag"]
                    });

                } else {
                    alert(data)
                }

            } catch (error) {
                console.error("Error RequesterORType:", error);
                alert(error.message);
            }

        }



    };



    const handleChangeFac = (event) => {
        setSTC_Header({
            P_FACTORY: event,
            P_SGA_NO: STC_Header.P_SGA_NO,
            P_STATUS: STC_Header.P_STATUS,
            P_STATUS_DESC: STC_Header.P_STATUS_DESC,
            P_PERIOD_TYPE: STC_Header.P_PERIOD_TYPE,
            P_CC: STC_Header.P_CC,
            P_TEAM: STC_Header.P_TEAM,
            P_THEME: STC_Header.P_THEME,
            P_ADVISOR: STC_Header.P_ADVISOR,
            P_MEMBER: STC_Header.P_MEMBER,
            P_PERIOD: STC_Header.P_PERIOD,
            P_START_DATE: STC_Header.P_START_DATE,
            P_END_DATE: STC_Header.P_END_DATE,
            P_PLAN_COST: STC_Header.P_PLAN_COST,
            P_ACTUAL_COST: STC_Header.P_ACTUAL_COST,
            P_MODIFY_BY: STC_Header.P_MODIFY_BY,
            P_MODIFY_DATE: STC_Header.P_MODIFY_DATE,
            P_YEAR: STC_Header.P_YEAR,
            P_SGA_FLAG: STC_Header.P_SGA_FLAG
        })
    };

    const handleChangePerType = (event) => {
        setSTC_Header({
            P_FACTORY: STC_Header.P_FACTORY,
            P_SGA_NO: STC_Header.P_SGA_NO,
            P_STATUS: STC_Header.P_STATUS,
            P_STATUS_DESC: STC_Header.P_STATUS_DESC,
            P_PERIOD_TYPE: event,
            P_CC: STC_Header.P_CC,
            P_TEAM: STC_Header.P_TEAM,
            P_THEME: STC_Header.P_THEME,
            P_ADVISOR: STC_Header.P_ADVISOR,
            P_MEMBER: STC_Header.P_MEMBER,
            P_PERIOD: STC_Header.P_PERIOD,
            P_START_DATE: STC_Header.P_START_DATE,
            P_END_DATE: STC_Header.P_END_DATE,
            P_PLAN_COST: STC_Header.P_PLAN_COST,
            P_ACTUAL_COST: STC_Header.P_ACTUAL_COST,
            P_MODIFY_BY: STC_Header.P_MODIFY_BY,
            P_MODIFY_DATE: STC_Header.P_MODIFY_DATE,
            P_YEAR: STC_Header.P_YEAR,
            P_SGA_FLAG: STC_Header.P_SGA_FLAG
        });
        //   console.log(event.value);
        setloading(true);
        GetPeriodType(event);
        setloading(false);
    };

    const handleChangeCC = (event) => {
        setSTC_Header({
            P_FACTORY: STC_Header.P_FACTORY,
            P_SGA_NO: STC_Header.P_SGA_NO,
            P_STATUS: STC_Header.P_STATUS,
            P_STATUS_DESC: STC_Header.P_STATUS_DESC,
            P_PERIOD_TYPE: STC_Header.P_PERIOD_TYPE,
            P_CC: event,
            P_TEAM: STC_Header.P_TEAM,
            P_THEME: STC_Header.P_THEME,
            P_ADVISOR: STC_Header.P_ADVISOR,
            P_MEMBER: STC_Header.P_MEMBER,
            P_PERIOD: STC_Header.P_PERIOD,
            P_START_DATE: STC_Header.P_START_DATE,
            P_END_DATE: STC_Header.P_END_DATE,
            P_PLAN_COST: STC_Header.P_PLAN_COST,
            P_ACTUAL_COST: STC_Header.P_ACTUAL_COST,
            P_MODIFY_BY: STC_Header.P_MODIFY_BY,
            P_MODIFY_DATE: STC_Header.P_MODIFY_DATE,
            P_YEAR: STC_Header.P_YEAR,
            P_SGA_FLAG: STC_Header.P_SGA_FLAG
        });
    };

    const handleInputChangeText = (e) => {
        const { name, value } = e.target;
        setSTC_Header(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const GetPeriodType = async (event) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getPeriod_Detail?P_YEAR=${STC_Header.P_YEAR}&P_PERIOD_CODE=${event.value}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                const { startdate, enddate, count_period } = data[0];
                setSTC_Header({
                    P_FACTORY: STC_Header.P_FACTORY,
                    P_SGA_NO: STC_Header.P_SGA_NO,
                    P_STATUS: STC_Header.P_STATUS,
                    P_STATUS_DESC: STC_Header.P_STATUS_DESC,
                    P_PERIOD_TYPE: event,
                    P_CC: STC_Header.P_CC,
                    P_TEAM: STC_Header.P_TEAM,
                    P_THEME: STC_Header.P_THEME,
                    P_ADVISOR: STC_Header.P_ADVISOR,
                    P_MEMBER: STC_Header.P_MEMBER,
                    P_PERIOD: count_period,
                    P_START_DATE: startdate,
                    P_END_DATE: enddate,
                    P_PLAN_COST: STC_Header.P_PLAN_COST,
                    P_ACTUAL_COST: STC_Header.P_ACTUAL_COST,
                    P_MODIFY_BY: STC_Header.P_MODIFY_BY,
                    P_MODIFY_DATE: STC_Header.P_MODIFY_DATE,
                    P_YEAR: STC_Header.P_YEAR,
                    P_SGA_FLAG: STC_Header.P_SGA_FLAG
                });

            } else {
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (STC_Header.P_PERIOD_TYPE === null) tempErrors.P_PERIOD_TYPE = '*Please select type...';
        if (STC_Header.P_CC === null) tempErrors.P_CC = '*Please select cost center...';
        if (!STC_Header.P_TEAM) tempErrors.P_TEAM = '*Please fill in team name...';
        if (!STC_Header.P_THEME) tempErrors.P_THEME = '*Please fill in theme...';
        if (!STC_Header.P_PLAN_COST) tempErrors.P_PLAN_COST = '*Please fill in target cost saving...';
        setErrors(tempErrors);
        console.log(tempErrors)
        return Object.keys(tempErrors).length === 0;
    };


    const OnSave = async () => {
        if (!validate()) {
            alert("Plase select or fill in field enter required.")

        } else {
            setloading(true);
            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/MergHeader`, STC_Header,
                    {
                        headers: {
                            // 'Content-Type': 'application/json',
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (response.status === 200) {
                    localStorage.setItem('SGAno', data)
                    GetDataRegister(data)
                    setloading(false);
                    alert("Save completed.")
                } else {
                    setloading(false);
                    alert(data);
                }


            } catch (error) {
                setloading(false);
                console.error("Error RequesterORType:", error);
                alert(error.message);
            }

        }

    };

    const { FactoryList, facList } = GetFactory();

    // useEffect(() => {
    //     const strFactory = facList.find(facList => facList.value === localStorage.getItem("emp_fac_code"));
    //     handleChangeFac(strFactory);
    //   }, [facList]);

    const OnReset = async () => {
        GetDataRegister(localStorage.getItem('SGAno'))
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
        STC_Header,
        setSTC_Header,
        handleChangeFac,
        handleChangePerType,
        handleChangeCC,
        handleInputChangeText,
        OnSave,
        OnReset,
        GetDataRegister,
        errors,
        OnSendToResult
    }
}

export { GetFactory, GetPeriodType, GetCostCenter, Register_FN }