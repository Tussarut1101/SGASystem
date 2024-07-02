import React, { useState, useEffect } from 'react';
import axios from 'axios';

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Login_Function() {
  const [txtEmpID, settxtEmpID] = useState("");
  const LoginCHECK = async () => {
    try {
      //const response = await axios.get(`${import.meta.env.VITE_API}/login?Emp_ID=${txtEmpID}`);
      const response = await axios.get(
        `${import.meta.env.VITE_API}/login/LoginUser?Emp_ID=${txtEmpID}`,
        {
            headers: {
                'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
            },
        }
    );
      const Login = await response.data;
      //if (!Login || Login.trim() === "") {
      if (Login.length > 0) {
        localStorage.setItem("emp_code",txtEmpID);
        localStorage.setItem("emp_name",Login[0]["emp_title"] + Login[0]["emp_name"] + ' ' + Login[0]["emp_surname"]);
        localStorage.setItem("emp_cc",Login[0]["emp_cc"]);
        localStorage.setItem("emp_fac_desc",Login[0]["emp_fac_desc"]);
        localStorage.setItem("emp_fac_code",Login[0]["emp_fac_code"]);
        localStorage.setItem("emp_user",Login[0]["emp_user"]);

        window.location.href='/SGASystem/Home';
      }else{
        alert(Login);
      }
    } catch (error) {
      console.error("Error RequesterORType:", error);
      alert(error.message);
    }
  };
  return {LoginCHECK,settxtEmpID}
}

export { Login_Function }