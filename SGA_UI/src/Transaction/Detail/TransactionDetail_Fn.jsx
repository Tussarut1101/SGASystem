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

function GetStatusForUser() {
  const [SGAStatusList, setSGAStatusList] = useState([]);
  const statusList = [
    {
      value: 'Active',
      label: 'Active'
    },
    {
      value: 'Inctive',
      label: 'Inctive'
    }
  ];
  setSGAStatusList(statusList);

  return { SGAStatusList }
}

function GetStatusForLeader() {
  const [SGAStatusList, setSGAStatusList] = useState([]);
  const statusList = [
    {
      value: 'Active',
      label: 'Active'
    },
    {
      value: 'Inctive',
      label: 'Inctive'
    }
  ];
  setSGAStatusList(statusList);

  return { SGAStatusList }
}

function TransactionDetail_Fn() {

  const [loading, setloading] = useState(false);
  const [selectedOptionFac, setSelectedOptionFac] = useState(null);

  const handleChangeFac = (event) => {
    setSelectedOptionFac(event);
  };

  const [STC_Header, setSTC_Header] = useState({
    P_SGA_NO: '',
    P_STATUS: '',
    P_STATUS_DESC: '',
    P_SGA_FLAG: false
  });

  const GetHeader = async (SGAOno) => {
    if (SGAOno === null || SGAOno === '' || SGAOno === ' ') {
      setSTC_Header({
        P_SGA_NO: '',
        P_STATUS: 'S10',
        P_STATUS_DESC: 'Create',
        P_SGA_FLAG: false
      })
    } else {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API}/transaction/getDataRegister?P_SGA_NO=${SGAOno}`,
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
    }
  };

  return { loading, setloading, handleChangeFac, selectedOptionFac, setSelectedOptionFac, STC_Header, setSTC_Header, GetHeader }
}

export { GetFactory, TransactionDetail_Fn }