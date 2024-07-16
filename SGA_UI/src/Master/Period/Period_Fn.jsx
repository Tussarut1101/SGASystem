import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Header } from 'antd/es/layout/layout';

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function GetYear() {
    const [yearList, setyearList] = useState([]);
    const YearList = async () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 5; i++) {
            years.push({ value: currentYear - i, label: currentYear - i });
        }
        setyearList(years);
    };
    return { YearList, yearList }
}

function Period_Fn() {
    // const { YearList, yearList, ttt } = GetYear();
    const [loading, setloading] = useState(false);
    const [selectedOptionYear, setSelectedOptionYear] = useState(null);
    const statusList = [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]

    const handleChangeYear = (event) => {
        setSelectedOptionPeriod(null);
        PeriodTypeList(event.value)
        setSelectedOptionYear(event);
    };

    const [perTypeList, setperTypeList] = useState([]);
    const PeriodTypeList = async (year) => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/common/getPeriodByYear?P_YEAR=${year}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
                    },
                });
            const data = await response.data;
            if (data.length > 0) {
                setperTypeList(data);
            }
        } catch (error) {
            console.error("Error Factory.", error);
            alert(error.message);
        }
    };


    const [selectedOptionPeriod, setSelectedOptionPeriod] = useState(null);
    const handleChangePeriod = (event) => {
        setSelectedOptionPeriod(event);
    };

    const [selectStatus, setselectStatus] = useState(null);
    const handleChangeStatus = (event) => {
        setselectStatus(event);
    };

    const [genDetailTable, setDetailTable] = useState([]);
    const GetData = async () => {
        setloading(true)
        let P_YEAR
        if (selectedOptionYear === null) {
            P_YEAR = '0'
        }
        else {
            P_YEAR = selectedOptionYear.value;
        }

        let P_CODE
        if (selectedOptionPeriod === null) {
            P_CODE = '0'
        }
        else {
            P_CODE = selectedOptionPeriod.value;
        }

        let P_STATUS
        if (selectStatus === null) {
            P_STATUS = '0'
        }
        else {
            P_STATUS = selectStatus.value;
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/master/getPeriodMain?P_YEAR=${P_YEAR}&P_CODE=${P_CODE}&P_STATUS=${P_STATUS}`,
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

    const currentDate = new Date();
    const yearDefual = currentDate.getFullYear(); // รับปี
    const [actionForm, setactionForm] = useState('');
    const [isOpenPopup, setisOpenPopup] = useState(false);
    const [STC_FORM, setSTC_FORM] = useState({
        PERIOD_CODE: '',
        PERIOD_DESC: '',
        PERIOD_YEAR: `${yearDefual}`,
        PERIOD_DETAIL: [],
        PERIOD_STATUS: { value: 'Active', label: 'Active' },
        PERIOD_END_DATE: null,
        PERIOD_START_DATE: null
    });
    const GetDataForm = async (action, year, code) => {
        setloading(true)
        if (action === 'NEW') {
            setSTC_FORM({
                PERIOD_CODE: '',
                PERIOD_DESC: '',
                PERIOD_YEAR: `${yearDefual}`,
                PERIOD_DETAIL: [],
                PERIOD_STATUS: { value: 'Active', label: 'Active' },
                PERIOD_END_DATE: null,
                PERIOD_START_DATE: null
            });
            setloading(false)
        } else if (action === 'EDIT') {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/master/getPeriodDetail?P_YEAR=${year}&P_CODE=${code}`,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                setSTC_FORM(data);
                setloading(false);
            } catch (error) {
                setloading(false)
                console.error("Error RequesterORType:", error);
                alert(error.message);
            }
        }
        setactionForm(action);
        setisOpenPopup(true);

    };

    const handleInputChangeText = (e) => {
        const { name, value } = e.target;
        setSTC_FORM(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeStatusForm = (event) => {
        setSTC_FORM({
            PERIOD_CODE: STC_FORM.PERIOD_CODE,
            PERIOD_DESC: STC_FORM.PERIOD_DESC,
            PERIOD_YEAR: STC_FORM.PERIOD_YEAR,
            PERIOD_DETAIL: STC_FORM.PERIOD_DETAIL,
            PERIOD_STATUS: event,
            PERIOD_END_DATE: STC_FORM.PERIOD_END_DATE,
            PERIOD_START_DATE: STC_FORM.PERIOD_START_DATE
        });
    };

    const handleDateChangeStart = (event) => {
        const date = event;
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        setSTC_FORM({
            PERIOD_CODE: STC_FORM.PERIOD_CODE,
            PERIOD_DESC: STC_FORM.PERIOD_DESC,
            PERIOD_YEAR: STC_FORM.PERIOD_YEAR,
            PERIOD_DETAIL: STC_FORM.PERIOD_DETAIL,
            PERIOD_STATUS: STC_FORM.PERIOD_STATUS,
            PERIOD_END_DATE: STC_FORM.PERIOD_END_DATE,
            PERIOD_START_DATE: firstDayOfMonth
        });
    };

    const handleDateChangeEnd = (event) => {
        const date = event;
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (event !== null) {
            if (event < STC_FORM.PERIOD_START_DATE) {
                setSTC_FORM({
                    PERIOD_CODE: STC_FORM.PERIOD_CODE,
                    PERIOD_DESC: STC_FORM.PERIOD_DESC,
                    PERIOD_YEAR: STC_FORM.PERIOD_YEAR,
                    PERIOD_DETAIL: [],
                    PERIOD_STATUS: STC_FORM.PERIOD_STATUS,
                    PERIOD_END_DATE: null,
                    PERIOD_START_DATE: STC_FORM.PERIOD_START_DATE
                });
                alert('Select end date orver start date.')
            }
            else {
                const dateList = [];
                const start = new Date(STC_FORM.PERIOD_START_DATE);
                const end = new Date(event);
                start.setDate(1);
                let periodSeq = 1;
                while (start <= end) {
                    const monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);

                    dateList.push({
                        PD_SEQ: periodSeq,
                        PD_START_DATE: start.toLocaleDateString('en-GB'),
                        PD_END_DATE: monthEnd.toLocaleDateString('en-GB')
                    });

                    start.setMonth(start.getMonth() + 1);
                    start.setDate(1);
                    periodSeq = periodSeq + 1;
                }

                setSTC_FORM({
                    PERIOD_CODE: STC_FORM.PERIOD_CODE,
                    PERIOD_DESC: STC_FORM.PERIOD_DESC,
                    PERIOD_YEAR: STC_FORM.PERIOD_YEAR,
                    PERIOD_DETAIL: dateList,
                    PERIOD_STATUS: STC_FORM.PERIOD_STATUS,
                    PERIOD_END_DATE: lastDayOfMonth,
                    PERIOD_START_DATE: STC_FORM.PERIOD_START_DATE
                });
            }
        }


    };

    const OnSave = async () => {
        if (STC_FORM.PERIOD_YEAR === null || STC_FORM.PERIOD_YEAR.trim() === '') {
            alert('Please fill in year.')
        } else {
            if (STC_FORM.PERIOD_STATUS.value === null || STC_FORM.PERIOD_STATUS.value.trim() === '') {
                alert('Please select status active or inactive.')
            } else {
                if (STC_FORM.PERIOD_CODE === null || STC_FORM.PERIOD_CODE.trim() === '') {
                    alert('Please fill in period code.')
                } else {
                    if (STC_FORM.PERIOD_DESC === null || STC_FORM.PERIOD_DESC.trim() === '') {
                        alert('Please fill in description.')
                    } else {
                        if (STC_FORM.PERIOD_START_DATE === null) {
                            alert('Please select start date.')
                        } else {
                            if (STC_FORM.PERIOD_END_DATE === null) {
                                alert('Please select end date.')
                            } else {
                                setloading(true);
                                try {

                                    const response = await axios.post(
                                        `${import.meta.env.VITE_API}/master/MergePeriodMaster`, STC_FORM,
                                        {
                                            headers: {
                                                // 'Content-Type': 'application/json',
                                                'Authorization': `Basic ${token}`,
                                            },
                                        }
                                    );
                                    const data = await response.data;
                                    if (response.status === 200) {
                                        // localStorage.setItem('SGAno', data)
                                        // GetDataRegister(data)
                                        GetDataForm('EDIT', STC_FORM.PERIOD_YEAR, STC_FORM.PERIOD_CODE)
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
                        }
                    }
                }
            }
        }


    };

    const OnReset = async () => {
        GetDataForm(actionForm, STC_FORM.PERIOD_YEAR, STC_FORM.PERIOD_CODE)
    };

    const OnDelete = async (year, code) => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/master/del_PeriodMaster?P_YEAR=${year}&P_CODE=${code}`,null,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                GetData()
                alert("Deleted completed.")
            } else {
                setloading(false);
                alert(data);
            }


        } catch (error) {
            setloading(false);
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }
    };

    const OnReload = async () => {
        window.location.reload();
    };
    return {
        loading,
        setloading,
        selectedOptionYear,
        setSelectedOptionYear,
        handleChangeYear,
        perTypeList,
        setperTypeList,
        PeriodTypeList,
        selectedOptionPeriod,
        setSelectedOptionPeriod,
        handleChangePeriod,
        statusList,
        selectStatus,
        handleChangeStatus,
        GetData,
        genDetailTable,
        actionForm,
        STC_FORM,
        isOpenPopup,
        setisOpenPopup,
        GetDataForm,
        handleInputChangeText,
        handleChangeStatusForm,
        handleDateChangeStart,
        handleDateChangeEnd,
        OnSave,
        OnReset,
        OnDelete,
        OnReload
    }
}

export { GetYear, Period_Fn }