import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Header } from 'antd/es/layout/layout';

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


function CategoryM_Fn() {
    const [loading, setloading] = useState(false);
    const statusList = [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]


    const [selectCategory, setselectCategory] = useState(null);
    const handleChangeCategory = (event) => {
        setselectCategory(event)
    };

    const [selectStatus, setselectStatus] = useState(null);
    const handleChangeStatus = (event) => {
        setselectStatus(event)
    };

    const [genDetailTable, setDetailTable] = useState([]);
    const GetData = async () => {
        setloading(true)
        let P_TYPER
        if (selectCategory === null) {
            P_TYPER = '0'
        }
        else {
            P_TYPER = selectCategory.value;
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
                `${import.meta.env.VITE_API}/master/getCategoryMain?P_TYPE=${P_TYPER}&P_STATUS=${P_STATUS}`,
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

    const OnReload = async () => {
        window.location.reload();
    };
    const [isDetail, setisDetail] = useState(false);
    const flagList = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]
    const [actionForm, setactionForm] = useState('');
    const [isOpenPopup, setisOpenPopup] = useState(false);
    const [STC_HEAD, setSTC_HEAD] = useState({});
    const GetDataForm = async (action, type) => {
        setloading(true)
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/master/getCategoryDetailHead?P_TYPE=${type}&P_USER=${localStorage.getItem('emp_user')}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            setSTC_HEAD(data);

            setloading(false);
        } catch (error) {
            setloading(false)
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

        setactionForm(action);
        setisOpenPopup(true);
        setisDetail(false)

    };

    const OnDelMain = async (type) => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/master/del_CategoryMaster?P_TYPE=${type}&P_CODE=`, null,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                GetData()
                alert("Delete completed.")
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

    const handleInputChangeTextHead = (e) => {
        const { name, value } = e.target;
        setSTC_HEAD(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeStatusHeadForm = (event) => {
        setSTC_HEAD({
            TYPE_CODE: STC_HEAD.TYPE_CODE,
            TYPE_DESC: STC_HEAD.TYPE_DESC,
            TYPE_STATUS: event,
            TYPE_MODIFY_BY: STC_HEAD.TYPE_MODIFY_BY,
            TYPE_MODIFY_DATE: STC_HEAD.TYPE_MODIFY_DATE
        });
    };

    const OnSaveHeader = async () => {
        if (STC_HEAD.TYPE_DESC === null || STC_HEAD.TYPE_DESC.trim() === '') {
            alert('Please fill in Description.')
        } else {
            setloading(true);
            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API}/master/MergeCategoryHead`, STC_HEAD,
                    {
                        headers: {
                            'Authorization': `Basic ${token}`,
                        },
                    }
                );
                const data = await response.data;
                if (response.status === 200) {
                    GetDataForm('EDIT', STC_HEAD.TYPE_CODE)
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

    const OnResetHeader = async () => {
        GetDataForm(actionForm, STC_HEAD.TYPE_CODE)
    };

    const [isNewCode, setisNewCode] = useState(false);
    const [STC_SUB, setSTC_SUB] = useState({});
    const [detailList, setdetailList] = useState([]);
    const GetDataFormDetail = async (type) => {
        setloading(true)
        try {
            const response2 = await axios.get(
                `${import.meta.env.VITE_API}/master/getCategoryDetailSubHead?P_TYPE=${type}&P_CODE=`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data2 = await response2.data;
            setSTC_SUB(data2)
            if (data2.TYPED_CODE === null || data2.TYPED_CODE.trim() === '') {
                setisNewCode(false)
            } else {
                setisNewCode(true)
            }


            const response3 = await axios.get(
                `${import.meta.env.VITE_API}/master/getCategoryDetail?P_TYPE=${type}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data3 = await response3.data;
            setdetailList(data3);
            setloading(false);
        } catch (error) {
            setloading(false)
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

        setisDetail(true);

    };

    const handleInputChangeTextSub = (e) => {
        const { name, value } = e.target;
        setSTC_SUB(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeStatusSub = (event) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: event,
            TYPED_BEFORE: STC_SUB.TYPED_BEFORE,
            TYPED_1QTARGET: STC_SUB.TYPED_1QTARGET,
            TYPED_2QTARGET: STC_SUB.TYPED_2QTARGET,
            TYPED_TARGET: STC_SUB.TYPED_TARGET,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: STC_SUB.TYPED_FLAG_COST_SAVE
        });
    };

    const handleChangeBefore = (event) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: STC_SUB.TYPED_STATUS,
            TYPED_BEFORE: event,
            TYPED_1QTARGET: STC_SUB.TYPED_1QTARGET,
            TYPED_2QTARGET: STC_SUB.TYPED_2QTARGET,
            TYPED_TARGET: STC_SUB.TYPED_TARGET,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: STC_SUB.TYPED_FLAG_COST_SAVE
        });
    };

    const handleChange1Q = (event) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: STC_SUB.TYPED_STATUS,
            TYPED_BEFORE: STC_SUB.TYPED_BEFORE,
            TYPED_1QTARGET: event,
            TYPED_2QTARGET: STC_SUB.TYPED_2QTARGET,
            TYPED_TARGET: STC_SUB.TYPED_TARGET,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: STC_SUB.TYPED_FLAG_COST_SAVE
        });
    };

    const handleChange2Q = (event) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: STC_SUB.TYPED_STATUS,
            TYPED_BEFORE: STC_SUB.TYPED_BEFORE,
            TYPED_1QTARGET: STC_SUB.TYPED_1QTARGET,
            TYPED_2QTARGET: event,
            TYPED_TARGET: STC_SUB.TYPED_TARGET,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: STC_SUB.TYPED_FLAG_COST_SAVE
        });
    };

    const handleChangeTarget = (event) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: STC_SUB.TYPED_STATUS,
            TYPED_BEFORE: STC_SUB.TYPED_BEFORE,
            TYPED_1QTARGET: STC_SUB.TYPED_1QTARGET,
            TYPED_2QTARGET: STC_SUB.TYPED_2QTARGET,
            TYPED_TARGET: event,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: STC_SUB.TYPED_FLAG_COST_SAVE
        });
    };

    const handleChangeRadito = (e) => {
        setSTC_SUB({
            TYPED_TYPE_CODE: STC_SUB.TYPED_TYPE_CODE,
            TYPED_CODE: STC_SUB.TYPED_CODE,
            TYPED_DESC: STC_SUB.TYPED_DESC,
            TYPED_STATUS: STC_SUB.TYPED_STATUS,
            TYPED_BEFORE: STC_SUB.TYPED_BEFORE,
            TYPED_1QTARGET: STC_SUB.TYPED_1QTARGET,
            TYPED_2QTARGET: STC_SUB.TYPED_2QTARGET,
            TYPED_TARGET: STC_SUB.TYPED_TARGET,
            TYPED_SORT: STC_SUB.TYPED_SORT,
            TYPED_FLAG_COST_SAVE: e.target.value
        });
    };

    const GetDataFormSubDetail = async (type, code) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/master/getCategoryDetailSubHead?P_TYPE=${type}&P_CODE=${code}`,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            setSTC_SUB(data)
        } catch (error) {
            console.error("Error RequesterORType:", error);
            alert(error.message);
        }

    };

    const OnSaveDetail = async () => {
        if (STC_SUB.TYPED_CODE === null || STC_SUB.TYPED_CODE.trim() === '') {
            alert('Please fill in item code.')
        } else {
            if (STC_SUB.TYPED_DESC === null || STC_SUB.TYPED_DESC.trim() === '') {
                alert('Please fill in item description.')
            } else {
                setloading(true);
                try {

                    const response = await axios.post(
                        `${import.meta.env.VITE_API}/master/MergeCategoryDetail`, STC_SUB,
                        {
                            headers: {
                                'Authorization': `Basic ${token}`,
                            },
                        }
                    );
                    const data = await response.data;
                    if (response.status === 200) {
                        GetDataFormDetail(STC_SUB.TYPED_TYPE_CODE)
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
    };

    const OnDelDetail = async (type, code) => {
        setloading(true);
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API}/master/del_CategoryMaster?P_TYPE=${type}&P_CODE=${code}`, null,
                {
                    headers: {
                        'Authorization': `Basic ${token}`,
                    },
                }
            );
            const data = await response.data;
            if (response.status === 200) {
                GetDataFormDetail(type)
                alert("Delete completed.")
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

    const OnResetDetail = async () => {
        GetDataFormDetail(STC_SUB.TYPED_TYPE_CODE)
    };

    const OnBack = async () => {
        setisDetail(false);
    };

    return {
        loading,
        setloading,
        statusList,
        selectCategory,
        handleChangeCategory,
        selectStatus,
        handleChangeStatus,
        genDetailTable,
        GetData,
        OnReload,
        STC_HEAD,
        STC_SUB,
        detailList,
        GetDataForm,
        actionForm,
        isOpenPopup,
        setisOpenPopup,
        handleInputChangeTextHead,
        handleChangeStatusHeadForm,
        isDetail,
        setisDetail,
        GetDataFormDetail,
        handleInputChangeTextSub,
        handleChangeStatusSub,
        handleChangeBefore,
        handleChange1Q,
        handleChange2Q,
        handleChangeTarget,
        flagList,
        handleChangeRadito,
        GetDataFormSubDetail,
        OnResetDetail,
        OnBack,
        OnSaveHeader,
        OnResetHeader,
        isNewCode,
        OnSaveDetail,
        OnDelMain,
        OnDelDetail
    }

}
export { CategoryM_Fn, GetCategory }