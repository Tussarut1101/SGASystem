import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Header_Fn() {
    // const [menuList, setmenuList] = useState([]);
    //const menuListDefaul = [
    const menuList = [
        {
            id: 1,
            name: 'Transaction Function',
            path: '',
            children: [
                { id: 101, name: 'SGA Register', path: '/SGASystem/Transaction?txtHeader=SGA Register&txtSubHeader=Issue transaction&txtStatus=S10,S20,S30&txtType=TRANSACTION&txtAction=REGISTER' },
                { id: 102, name: 'SGA Update Result', path: '/SGASystem/Transaction?txtHeader=SGA Update Result&txtSubHeader=Issue transaction&txtStatus=S40,S60,S80,S100,S120,S140,S60N,S80N,S100N,S120N,S140N,S160N&txtType=TRANSACTION&txtAction=UPDATE' }
            ]
        },
        {
            id: 2,
            name: 'Approve Function',
            path: '',
            children: [
                { id: 201, name: 'SGA Approve', path: '/SGASystem/Transaction?txtHeader=SGA Approve Result&txtSubHeader=Approve transaction&txtStatus=S50,S70,S90,S110,S130,S150&txtType=TRANSACTION&txtAction=APPROVE' }
            ]
        },
        {
            id: 3,
            name: 'Master Function',
            path: '',
            children: [
                { id: 301, name: 'Priod Master', path: '/SGASystem/Master/Period' },
                { id: 302, name: 'Category Master', path: '/SGASystem/Master/Category' }
            ]
        },
        // {
        //     id: 4,
        //     name: 'Mornitor Function',
        //     path: '/SGASystem/Home',
        //     children: ''
        // },
        {
            id: 4,
            name: 'Report Function',
            path: '',
            children: [
                { id: 401, name: 'SGA result report', path: '/SGASystem/Report/Result' }
            ]
        }

    ];

    // const MenuSGA = async () => {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_API}/header/getMenu`);
    //         const data = await response.data;
    //         if (data.length > 0) {
    //             setmenuList(data);
    //         } else {
    //             //setmenuList(menuListDefaul);
    //             alert(data)
    //         }
    //     } catch (error) {
    //         console.error("Error Menu.", error);
    //         alert(error.message);
    //     }
    // };
    //return { MenuSGA, menuList }
    return {  menuList }
}

function Logout_Fn() {
    const handleLogout = () => {
        console.log("Logout clicked");
        window.location.href = '/SGASystem';
        localStorage.setItem("emp_code", '');
        localStorage.setItem("emp_name", '');
        localStorage.setItem("emp_cc", '');
        localStorage.setItem("emp_fac_desc", '');
        localStorage.setItem("emp_fac_code", '');
        localStorage.setItem("emp_user", '');
    };

    return { handleLogout }
}

function Logo_Fn() {
    const handleHome = () => {
        console.log("Home clicked");
        window.location.href = '/SGASystem/Home';
    };

    return { handleHome }
}

function Menu_Fn() {
    const [openMenu, setOpenMenu] = useState(null); // เก็บสถานะของเมนูที่เปิด

    const toggleMenu = (menuId) => {
        setOpenMenu(openMenu === menuId ? null : menuId); // เปิดหรือปิดเมนูที่ถูกคลิก
    }

    const handleMenu = (path) => {
        window.location.href = path;
    };

    return { toggleMenu, openMenu, handleMenu }
}

export { Header_Fn, Logout_Fn, Logo_Fn, Menu_Fn }