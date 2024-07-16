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

function SearchData() {

    const [loading, setloading] = useState(false);
    const [period, setperiod] = useState(0);
    const [colS, setcolS] = useState(3);
    const [STC_MONTH, setSTC_MONTH] = useState({
        M_01: '',
        M_02: '',
        M_03: '',
        M_04: '',
        M_05: '',
        M_06: '',
        M_07: '',
        M_08: '',
        M_09: '',
        M_10: '',
        M_11: '',
        M_12: ''
    });

    const [STC_SEARCH, setSTC_SEARCH] = useState({
        P_FACTORY: null,
        P_YEAR: '',
        P_TYPE: null,
        P_SGA_NO_FRM: '',
        P_SGA_NO_TO: '',
        P_ISS_DATE_FRM: null,
        P_ISS_DATE_TO: null,
        P_START_DATE: null,
        P_END_DATE: null,
        P_EMPID_FRM: '',
        P_EMPID_TO: '',
        P_CC: null,
        P_TYPE_REPORT: 'SUMMARY'
    });

    const handleChangeFac = (event) => {
        setSTC_SEARCH({
            P_FACTORY: event,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
    };

    const handleChangeType = (event) => {
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: event,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
        getStartDateEndDate(STC_SEARCH.P_YEAR, event)
    };

    const getStartDateEndDate = async (year, event) => {
        if ((year.trim() !== '' || year.trim() !== null) && (event !== null)) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/master/getPeriodDetail?P_YEAR=${year}&P_CODE=${event.value}`,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                setSTC_SEARCH({
                    P_FACTORY: STC_SEARCH.P_FACTORY,
                    P_YEAR: STC_SEARCH.P_YEAR,
                    P_TYPE: event,
                    P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
                    P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
                    P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
                    P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
                    P_START_DATE: data['PERIOD_START_DATE'],
                    P_END_DATE: data['PERIOD_END_DATE'],
                    P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
                    P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
                    P_CC: STC_SEARCH.P_CC,
                    P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
                })
                const start = new Date(data['PERIOD_START_DATE']);
                const end = new Date(data['PERIOD_END_DATE']);

                const startMonth = start.getMonth() + 1;
                const startYear = start.getFullYear();
                const endMonth = end.getMonth() + 1;
                const endYear = end.getFullYear();

                const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
                setperiod(totalMonths)

                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let iPeriod = 1;
                let current = new Date(start);
                while (current <= end) {
                    const monthName = monthNames[current.getMonth()];
                    // console.log(monthName)
                    let name;
                    if (iPeriod > 9) {
                        name = 'M_' + iPeriod
                    } else {
                        name = 'M_0' + iPeriod
                    }
                    let value = monthName;
                    setSTC_MONTH(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                    current.setMonth(current.getMonth() + 1);
                    iPeriod = iPeriod + 1;
                }

            } catch (error) {
                console.error("Error RequesterORType:", error);
                alert(error.message);
            }
        }

    };


    const handleIssueDateFrm = (event) => {
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: event,
            P_ISS_DATE_TO: event,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
    };

    const handleIssueDateTo = (event) => {
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: event,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
    };

    const handleStartDate = (event) => {
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
            P_START_DATE: event,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
    };

    const handleEndDate = (event) => {
        if (event !== null) {
            const start = new Date(STC_SEARCH.P_START_DATE);
            const end = new Date(event);
            if (end < start) {
                alert('Select end date orver start date.')
            } else {
                setSTC_SEARCH({
                    P_FACTORY: STC_SEARCH.P_FACTORY,
                    P_YEAR: STC_SEARCH.P_YEAR,
                    P_TYPE: STC_SEARCH.P_TYPE,
                    P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
                    P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
                    P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
                    P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
                    P_START_DATE: STC_SEARCH.P_START_DATE,
                    P_END_DATE: event,
                    P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
                    P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
                    P_CC: STC_SEARCH.P_CC,
                    P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
                })

                const start = new Date(STC_SEARCH.P_START_DATE);
                const end = new Date(event);

                const startMonth = start.getMonth() + 1;
                const startYear = start.getFullYear();
                const endMonth = end.getMonth() + 1;
                const endYear = end.getFullYear();

                const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
                setperiod(totalMonths)

                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let iPeriod = 1;
                let current = new Date(start);
                while (current <= end) {
                    const monthName = monthNames[current.getMonth()];
                    let name;
                    if (iPeriod > 9) {
                        name = 'M_' + iPeriod
                    } else {
                        name = 'M_0' + iPeriod
                    }
                    let value = monthName;
                    setSTC_MONTH(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                    current.setMonth(current.getMonth() + 1);
                    iPeriod = iPeriod + 1;
                }
            }
        }

    };

    const handleInputChangeText = (e) => {
        const { name, value } = e.target;
        setSTC_SEARCH(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'P_YEAR') {
            PeriodTypeList(value)
        }
    };

    const handleChangeCC = (event) => {
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: event,
            P_TYPE_REPORT: STC_SEARCH.P_TYPE_REPORT
        })
    };

    const [nameReport, setnameReport] = useState('Summary_Report');

    useEffect(() => {
        console.log(nameReport);
    }, [nameReport]);

    const handleChangeRadito = (e) => {
        if (e.target.value === 'SUMMARY') {
            setcolS(3)
            setnameReport('Summary_Report')
        }else if (e.target.value === 'SUMMARY_CATEGORY') {
            setcolS(3)
            setnameReport('SummaryCategory_Report')
        } else {
            if (e.target.value === 'MANAGER') {
                setnameReport('Manager_Report')
            }else{
                setnameReport('Member_Report')
            }
            setcolS(2)
        }
        setSTC_SEARCH({
            P_FACTORY: STC_SEARCH.P_FACTORY,
            P_YEAR: STC_SEARCH.P_YEAR,
            P_TYPE: STC_SEARCH.P_TYPE,
            P_SGA_NO_FRM: STC_SEARCH.P_SGA_NO_FRM,
            P_SGA_NO_TO: STC_SEARCH.P_SGA_NO_TO,
            P_ISS_DATE_FRM: STC_SEARCH.P_ISS_DATE_FRM,
            P_ISS_DATE_TO: STC_SEARCH.P_ISS_DATE_TO,
            P_START_DATE: STC_SEARCH.P_START_DATE,
            P_END_DATE: STC_SEARCH.P_END_DATE,
            P_EMPID_FRM: STC_SEARCH.P_EMPID_FRM,
            P_EMPID_TO: STC_SEARCH.P_EMPID_TO,
            P_CC: STC_SEARCH.P_CC,
            P_TYPE_REPORT: e.target.value
        })
        setdataList([]);

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

    const [dataList, setdataList] = useState([]);

    useEffect(() => {
        console.log(dataList);
    }, [dataList]);

    const resultList = [];
    const OnSearch = async () => {
        resultList.length = 0;
        let P_FAC = '0';
        let P_YEAR = '0';
        let P_SGA_NO_FRM = '0';
        let P_SGA_NO_TO = '0';
        let P_TYPE = '0';
        let P_ISS_DATE_FRM = '0';
        let P_ISS_DATE_TO = '0';
        let P_CC = '';
        let P_EMP_FRM = '0';
        let P_EMP_TO = '0';
        let P_START_DATE = '0';
        let P_END_DATE = '0';
        let P_TYPE_REPORT = '0';

        if (STC_SEARCH.P_FACTORY !== null) {
            P_FAC = STC_SEARCH.P_FACTORY.value
        }else{
            alert('Please select factory.')
            return
        }

        if (STC_SEARCH.P_YEAR !== null && STC_SEARCH.P_YEAR.trim() !== '') {
            P_YEAR = STC_SEARCH.P_YEAR
        }else{
            alert('Please fill in year.')
            return
        }

        if (STC_SEARCH.P_SGA_NO_FRM !== null && STC_SEARCH.P_SGA_NO_FRM.trim() !== '') {
            P_SGA_NO_FRM = STC_SEARCH.P_SGA_NO_FRM
        }

        if (STC_SEARCH.P_SGA_NO_TO !== null && STC_SEARCH.P_SGA_NO_TO.trim() !== '') {
            P_SGA_NO_TO = STC_SEARCH.P_SGA_NO_TO
        }

        if (STC_SEARCH.P_TYPE !== null) {
            P_TYPE = STC_SEARCH.P_TYPE.value
        }else{
            alert('Please select type.')
            return
        }

        if (STC_SEARCH.P_ISS_DATE_FRM !== null) {
            const dFrm = new Date(STC_SEARCH.P_ISS_DATE_FRM);
            P_ISS_DATE_FRM = dFrm.getFullYear() + String(dFrm.getMonth() + 1).padStart(2, '0') + String(dFrm.getDate()).padStart(2, '0');
        }

        if (STC_SEARCH.P_ISS_DATE_TO !== null) {
            const dTo = new Date(STC_SEARCH.P_ISS_DATE_TO);
            P_ISS_DATE_TO = dTo.getFullYear() + String(dTo.getMonth() + 1).padStart(2, '0') + String(dTo.getDate()).padStart(2, '0');
        }

        if (STC_SEARCH.P_CC !== null) {
            P_CC = STC_SEARCH.P_CC.value
        }

        if (STC_SEARCH.P_EMPID_FRM !== null && STC_SEARCH.P_EMPID_FRM.trim() !== '') {
            P_EMP_FRM = STC_SEARCH.P_SGA_NO_FRM
        }

        if (STC_SEARCH.P_EMPID_TO !== null && STC_SEARCH.P_EMPID_TO.trim() !== '') {
            P_EMP_TO = STC_SEARCH.P_SGA_NO_TO
        }

        if (STC_SEARCH.P_START_DATE !== null) {
            const start = new Date(STC_SEARCH.P_START_DATE);
            P_START_DATE = start.getFullYear() + String(start.getMonth() + 1).padStart(2, '0') + String(start.getDate()).padStart(2, '0');
        }else{
            alert('Please select start date.')
            return
        }

        if (STC_SEARCH.P_END_DATE !== null) {
            const end = new Date(STC_SEARCH.P_END_DATE);

            P_END_DATE = end.getFullYear() + String(end.getMonth() + 1).padStart(2, '0') + String(end.getDate()).padStart(2, '0');
        }else{
            alert('Please select end date.')
            return
        }

        if (STC_SEARCH.P_TYPE_REPORT !== null && STC_SEARCH.P_TYPE_REPORT.trim() !== '') {
            P_TYPE_REPORT = STC_SEARCH.P_TYPE_REPORT
        }

        setloading(true)
        let dataHead;
        let dataDetail;

        const start = new Date(STC_SEARCH.P_START_DATE);
        const end = new Date(STC_SEARCH.P_END_DATE);
        const checkDateList = [];
        let current = new Date(start);
        while (current <= end) {
            checkDateList.push({ P_CHECK: current.getFullYear() + String(current.getMonth() + 1).padStart(2, '0') })
            current.setMonth(current.getMonth() + 1);
        }
        console.log(`${import.meta.env.VITE_API}/report/getResultHead_RPT?P_FAC=${P_FAC}&P_YEAR=${P_YEAR}&P_SGA_NO_FRM=${P_SGA_NO_FRM}&P_SGA_NO_TO=${P_SGA_NO_TO}&P_TYPE=${P_TYPE}&P_ISS_DATE_FRM=${P_ISS_DATE_FRM}&P_ISS_DATE_TO=${P_ISS_DATE_TO}&P_CC=${P_CC}&P_EMP_FRM=${P_EMP_FRM}&P_EMP_TO=${P_EMP_TO}&P_START_DATE=${P_START_DATE}&P_END_DATE=${P_END_DATE}&P_TYPE_REPORT=${P_TYPE_REPORT}`)
        try {
            const responseHead = await axios.get(`${import.meta.env.VITE_API}/report/getResultHead_RPT?P_FAC=${P_FAC}&P_YEAR=${P_YEAR}&P_SGA_NO_FRM=${P_SGA_NO_FRM}&P_SGA_NO_TO=${P_SGA_NO_TO}&P_TYPE=${P_TYPE}&P_ISS_DATE_FRM=${P_ISS_DATE_FRM}&P_ISS_DATE_TO=${P_ISS_DATE_TO}&P_CC=${P_CC}&P_EMP_FRM=${P_EMP_FRM}&P_EMP_TO=${P_EMP_TO}&P_START_DATE=${P_START_DATE}&P_END_DATE=${P_END_DATE}&P_TYPE_REPORT=${P_TYPE_REPORT}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                });
            dataHead = await responseHead.data;
            if (dataHead.length > 0) {
                const responseDetail = await axios.get(`${import.meta.env.VITE_API}/report/getResultDetail_RPT?P_FAC=${P_FAC}&P_YEAR=${P_YEAR}&P_SGA_NO_FRM=${P_SGA_NO_FRM}&P_SGA_NO_TO=${P_SGA_NO_TO}&P_TYPE=${P_TYPE}&P_ISS_DATE_FRM=${P_ISS_DATE_FRM}&P_ISS_DATE_TO=${P_ISS_DATE_TO}&P_CC=${P_CC}&P_EMP_FRM=${P_EMP_FRM}&P_EMP_TO=${P_EMP_TO}&P_START_DATE=${P_START_DATE}&P_END_DATE=${P_END_DATE}&P_TYPE_REPORT=${P_TYPE_REPORT}`,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    });
                dataDetail = await responseDetail.data;
                let filtered;
                let sga_no = '';
                let cDuplicate = false;
             
                dataHead.forEach(item1 => {
                    if (item1.sga_no === sga_no) {
                        sga_no = item1.sga_no;
                        item1.fac_code = ' ';
                        item1.fac_desc = ' ';
                        item1.sga_no = ' ';
                        item1.issue_date = ' ';
                        item1.sga_type = ' ';
                        item1.sga_team = ' ';
                        item1.sga_theme = ' ';
                        item1.sga_category = ' ';
                        item1.sga_cc = ' ';
                        item1.sga_manager = ' ';
                        item1.total_manager = ' ';
                        item1.sga_period = ' ';
                        item1.total_member = ' ';
                        item1.start_date = ' ';
                        item1.end_date = ' ';
                        item1.total_target = ' ';
                        item1.total_actual = ' ';
                        item1.sga_status = ' ';
                        item1.sgah_create_date = ' ';
                        cDuplicate = true;
                     }else{
                        sga_no = item1.sga_no;
                        cDuplicate = false;
                     }

                    const combinedItem = {
                        ...item1,                        
                        ...checkDateList.reduce((acc, item2, index) => {
                            if (STC_SEARCH.P_TYPE_REPORT === 'SUMMARY') {
                                filtered = dataDetail.filter(item3 => item3.sga_no === sga_no && item3.sga_date_check === item2.P_CHECK);
                            }else if (STC_SEARCH.P_TYPE_REPORT === 'SUMMARY_CATEGORY') {
                                filtered = dataDetail.filter(item3 => item3.sga_no === sga_no && item3.sga_date_check === item2.P_CHECK && item3.sga_cate_seq === item1.sga_cate_seq);
                            } else {
                                filtered = dataDetail.filter(item3 => item3.sga_no === sga_no && item3.sga_date_check === item2.P_CHECK && item3.emp_id === item1.emp_id);
                            }
                            let namePlan;
                            let nameActual;
                            let nameAchieve;
                            const iPeriod = index + 1;
                            if (iPeriod > 9) {
                                namePlan = 'm_' + iPeriod + '_1'
                                nameActual = 'm_' + iPeriod + '_2'
                                nameAchieve = 'm_' + iPeriod + '_3'
                            } else {
                                namePlan = 'm_0' + iPeriod + '_1'
                                nameActual = 'm_0' + iPeriod + '_2'
                                nameAchieve = 'm_0' + iPeriod + '_3'
                            }
                            acc[namePlan] = '';
                            acc[nameActual] = '';
                            acc[nameAchieve] = '';
                            if (filtered.length > 0) {
                                if (STC_SEARCH.P_TYPE_REPORT === 'SUMMARY_CATEGORY'){
                                    if (cDuplicate){
                                        acc[namePlan] = '';
                                        acc[nameActual] = '';
                                        acc[nameAchieve] = filtered[0]['total_achieve'];
                                    }else{
                                        acc[namePlan] = filtered[0]['total_plan'];
                                        acc[nameActual] = filtered[0]['total_actual'];
                                        acc[nameAchieve] = filtered[0]['total_achieve'];
                                    }
                                    
                                }else{
                                    acc[namePlan] = filtered[0]['total_plan'];
                                    acc[nameActual] = filtered[0]['total_actual'];
                                    acc[nameAchieve] = filtered[0]['total_achieve'];
                                }
                                
                            } else {
                                acc[namePlan] = '';
                                acc[nameActual] = '';
                                acc[nameAchieve] = '';
                            }
                            return acc;
                        }, {}),
                    };
                    resultList.push(combinedItem);
                })

                setdataList(resultList);
                setloading(false);
            }

        } catch (error) {
            setloading(false);
            console.error("Error Factory.", error);
            alert(error.message);
        }

    };

    const OnReload = async () => {
        window.location.reload();
    };

    return {
        loading,
        setloading,
        STC_SEARCH,
        handleChangeFac,
        handleChangeType,
        handleIssueDateFrm,
        handleIssueDateTo,
        handleStartDate,
        handleEndDate,
        handleInputChangeText,
        handleChangeCC,
        perTypeList,
        handleChangeRadito,
        period,
        colS,
        STC_MONTH,
        OnSearch,
        OnReload,
        dataList,
        nameReport
    }
}

export { GetFactory, GetCostCenter, SearchData }