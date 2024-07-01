import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function GetCategory() {
    const [categoryList, setcategoryList] = useState([]);
    const CategoryList = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/transaction/getCategory`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
                    },
                });
            const data = await response.data;
            if (data.length > 0) {
                setcategoryList(data);
            } else {
                alert(data)
            }
        } catch (error) {
            console.error("Error Factory.", error);
            alert(error.message);
        }
    };
    return { CategoryList, categoryList }
}

function Category_Fn() {
    const [loading, setloading] = useState(false);
    const [isSelect, setisSelect] = useState(false);
    const [action, setaction] = useState('');
    const [iSeq, setiSeq] = useState(0);
    const [txtSubject, settxtSubject] = useState('');
    const [selectCategory, setselectCategory] = useState(null);
    const [STC_Header, setSTC_Header] = useState({
        P_SGA_NO: '',
        P_STATUS: '',
        P_STATUS_DESC: '',
        P_SGA_FLAG: false
    });

    const handleChangeCategory = (event) => {
        if (txtSubject === '' || txtSubject === null || txtSubject === ' ') {
            alert("Please fill in subject.")
        } else {
            setselectCategory(event)
            GetCateDetail(event)
        }
    };

    const handleInputChangeText = (e) => {
        // const { name, value } = e.target;
        // setSTC_Header(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
    };

    const [categoryDetailList, setcategoryDetailList] = useState([]);
    const GetCateDetail = async (event) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getTargetDetail_FromMaster?P_SGA_NO=${STC_Header.P_SGA_NO}&P_SEQ=${categoryMainlList[categoryMainlList.length - 1].sgap_seq + 1}&P_TYPE_CODE=${event.value}&P_SUBJECT=${txtSubject.replace(/&/g, 'rrandrr').replace(/'/g, 'rrzzrr')}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setcategoryDetailList(data);
                setisSelect(true)
            } else {
                setisSelect(false)
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const handleChangeDetail = (id, field, value) => {
        setcategoryDetailList(categoryDetailList.map(row =>
            row.sgap_code === id ? { ...row, [field]: value } : row
        ));
    };

    const handleInputCancelDetail = (even) => {
        setselectCategory(null);
        setisSelect(false);
        setcategoryDetailList([]);
        if (action === 'EDIT') {
            setaction('ADD');
            settxtSubject('');
        }
    };

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

    const [categoryMainlList, setcategoryMainlList] = useState([]);
    const GetCateMainTrans = async (SGOno) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getTargetMain_FromTrans?P_SGA_NO=${SGOno}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            setcategoryMainlList(data);

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const GetCateDetailTrans = async (SGOno, SEQ) => {
        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API}/transaction/getTargetDetail_FromTrans?P_SGA_NO=${SGOno}&P_SEQ=${SEQ}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (data.length > 0) {
                setcategoryDetailList(data);
                setisSelect(true)
            } else {
                setisSelect(false)
                alert(data)
            }

        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };


    const handleChangeCategoryForEdit = (event) => {
        setselectCategory(event)
    };

    const EditCategory = async (event, SGAno, Seq, Subject, Category, Desc) => {

        if (event === 'EDIT' || event === 'VIEW') {
            settxtSubject(Subject);
            setaction(event)
            setiSeq(Seq)
            const cate = { value: Category, label: Desc };
            setselectCategory(cate)
            GetCateDetailTrans(SGAno, Seq)
        }else{
            setloading(true);
            try {
    
                const response = await axios.post(
                    `${import.meta.env.VITE_API}/transaction/del_TargetDetail?P_SGA_NO=${SGAno}&P_SEQ=${Seq}`,null,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (response.status === 200) {
                    setselectCategory(null);
                    setisSelect(false);
                    setcategoryDetailList([]);
                    settxtSubject('');
                    GetCateMainTrans(localStorage.getItem('SGAno'));
                    setloading(false);
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
        }

    };


    const OnSave = async () => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/transaction/MergTargetDetail`, categoryDetailList,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                setselectCategory(null);
                setisSelect(false);
                setcategoryDetailList([]);
                settxtSubject('');
                GetCateMainTrans(localStorage.getItem('SGAno'));
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
    };

    const OnReset = async () => {
        if (action === 'EDIT') {
            GetCateDetailTrans(localStorage.getItem('SGAno'), iSeq)
        } else {
            handleChangeCategory(selectCategory)
        }
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
        isSelect,
        setisSelect,
        txtSubject,
        settxtSubject,
        selectCategory,
        setselectCategory,
        handleInputChangeText,
        handleChangeCategory,
        categoryDetailList,
        setcategoryDetailList,
        handleChangeDetail,
        handleInputCancelDetail,
        categoryMainlList,
        setcategoryMainlList,
        GetCateMainTrans,
        EditCategory,
        GetHeader,
        STC_Header,
        setaction,
        OnSave,
        OnReset,
        action,
        OnSendToResult
    }
}

export { GetCategory, Category_Fn }