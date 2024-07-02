import React, { useState, useEffect } from 'react';
import axios from "axios";

const username = import.meta.env.VITE_API_USER;
const password = import.meta.env.VITE_API_PASS;
const token = btoa(`${username}:${password}`);

function Home_Fn() {
    const empID = localStorage.getItem("emp_code");
    const [counts, setCounts] = useState({ count_iss: 0, count_res: 0, count_app: 0 });

    const GETJOBS = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/home/getJobs?Emp_ID=${empID}`,
          {
              headers: {
                  'Authorization': `Basic ${token}`, // ใส่ Authorization header แบบ Basic
              },
          });
          const data = await response.data;
          if (data.length > 0) {
            const { count_iss, count_res, count_app } = data[0];
            setCounts({ count_iss, count_res, count_app });
          } else {
            alert(data)
          }
        } catch (error) {
          console.error("Error Menu.", error);
          alert(error.message);
        }
      };
    return { GETJOBS,counts }
}

function Menu_Fn() {
  const handleMenu = (path) => {
      window.location.href = path;
  };

  return { handleMenu }
}

export { Home_Fn,Menu_Fn }