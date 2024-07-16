import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import Logo from '../Images/Logo.png';
import { FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import { Header_Fn, Logout_Fn, Logo_Fn, Menu_Fn } from './Header_Fn';
import axios from "axios";

function ButtonAppBar() {
    const { menuList } = Header_Fn();
    const { handleLogout } = Logout_Fn();
    const { handleHome } = Logo_Fn();
    const { toggleMenu, openMenu, handleMenu } = Menu_Fn();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="hBar">
                <div className="dBar">
                    <div className="dMenu">
                        <div className="dLogo" onClick={handleHome}>
                            <img src={Logo} alt="Logo" className='hlogo' /> SGASystem

                        </div>
                        {menuList.map((menuItem) => (
                            <div key={menuItem.id} className="menu-item">
                                {Array.isArray(menuItem.children) ? (
                                    <div className="menu-title" onClick={() => toggleMenu(menuItem.id)}>
                                        {menuItem.name} &nbsp;
                                        {openMenu === menuItem.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                ) : (<div className="menu-title" onClick={() => handleMenu(menuItem.path)}>
                                    {menuItem.name}
                                </div>)}

                                {openMenu === menuItem.id && (
                                    <div className="submenu">
                                        {Array.isArray(menuItem.children) ? (
                                            <ul>
                                                {menuItem.children.map((child) => (
                                                    <li key={child.id} className="menu-child" onClick={() => handleMenu(child.path)}>
                                                        {child.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            menuItem.children && (
                                                <ul>
                                                    <li key={menuItem.children.id} className="menu-child">
                                                        {menuItem.children.name}
                                                    </li>
                                                </ul>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="dUser">
                        <Avatar
                            sx={{ marginRight: "10px", width: 24, height: 24 }}
                        ></Avatar>
                        {localStorage.getItem("emp_code")} : {localStorage.getItem("emp_user")}
                        <IconButton onClick={handleLogout} color="inherit" sx={{ marginLeft: "10px" }}>
                            <FaSignOutAlt className="logout-icon" />
                        </IconButton>
                    </div>

                </div>
            </AppBar>
        </Box>
    );
}
export default ButtonAppBar;




