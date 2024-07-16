import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './TransactionDetail.css';
import Select from 'react-select';
import styled from 'styled-components';
import { TransactionDetail_Fn } from './TransactionDetail_Fn';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faRefresh, faPlus, faPenClip, faTrash, faFlag, faFile } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import TabStrip from '../Tabs/TabStrip';
import PopupConfirm from '../../Common/Popconfirm';

const tabs = [
  { label: 'Register' },
  { label: 'Monitoring' },
  { label: 'Activity' },
  { label: 'Category' },
  { label: 'Advisor' },
  { label: 'Member' },
  { label: 'Result' }
];


function TransactionDetail() {
  const location = useLocation();
  const [paramsGET, setparamsGET] = useState({ txtHeader: '', txtSubHeader: '', txtStatus: '', txtType: '', txtAction: '' });
  const [initialTab, setInitialTab] = useState(0);
  const { loading, setloading, STC_Header, setSTC_Header, GetHeader } = TransactionDetail_Fn();
  // const [StatusCode, setStatusCode] = useState('Create');
  //  const [StatusDesc, setStatusDesc] = useState('Create');


  useEffect(() => {
    setloading(true);
    GetHeader(localStorage.getItem('SGAno'))
    const txtHeader = localStorage.getItem("TitleHeader");
    const txtSubHeader = localStorage.getItem("TitleSubHeader");
    const txtStatus = localStorage.getItem("StatusCode");
    const txtType = localStorage.getItem("ReqType");
    const txtAction = localStorage.getItem("ReqAction");
    setparamsGET({ txtHeader, txtSubHeader, txtStatus, txtType, txtAction });
    setloading(false);
  }, []);

  const [SGAno, setSGAno] = useState('');
  const handleAction = (intTab, codeStatus, descStatus, sgaNo) => {
    // setStatusCode(codeStatus);
    // setStatusDesc(descStatus);
    GetHeader(localStorage.getItem('SGAno'))
    localStorage.setItem('StatusDesc', descStatus)
    setInitialTab(intTab);
  };

  useEffect(() => {
    setloading(true);
    
    setloading(false);
  }, [initialTab]);

  return (
    <div>
      {loading ? (
        <div>
          <PageLoad></PageLoad>
        </div>
      ) : (
        <div>
          <Header></Header>
          <div className='dFrist'>
            <div className='dContent'>
              <div className='dTitle'>{paramsGET.txtHeader}</div>
              <div className='dSubTitle'>{paramsGET.txtSubHeader}</div>
              <div className='dContentJobMain'>
                <div className='dContentJob'>
                  <div className='dflex'>
                    <div className='dflexRigth'>
                      <div className='dStatus'>
                        <div className='dIcon'>
                          <FontAwesomeIcon icon={faFlag} style={{ color: '#681668' }} /> </div>{localStorage.getItem("StatusDesc")}
                      </div>
                      {localStorage.getItem("SGAno") === null || localStorage.getItem("SGAno") === '' || localStorage.getItem("SGAno") === ' ' ? (null) : (<div className='dDocumentno'>
                        <div className='dIcon'>
                          <FontAwesomeIcon icon={faFile} style={{ color: '#681668' }} /> </div> {localStorage.getItem("SGAno")}
                      </div>)}
                    </div>
                  </div>
                  <div>
                    <TabStrip tabs={tabs} initialTab={initialTab} onAction={handleAction} />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}</div>
  )
}

export default TransactionDetail