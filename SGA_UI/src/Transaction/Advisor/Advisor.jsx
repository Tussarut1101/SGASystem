import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './Advisor.css';
import Select from 'react-select';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faRefresh, faPlus, faPenClip, faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { Advisor_Fn } from './Advisor_Fn';
import PopupConfirm from '../../Common/Popconfirm';

const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-selectADV__control {
    border: 1px solid #ddd;
    padding: 2px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    font-size: 14px;
    font-family: calibri Light;
    text-align: left;
    

    background-color: ${({ isDisabled }) => isDisabled ? 'rgb(224 208 224)' : 'transparent'};
    color: ${({ isDisabled }) => isDisabled ? '#999999' : 'inherit'};
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  }

  .react-selectADV__menu {
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
`;

const StyledTextBox = styled.input`
  width: 100% !important;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-family: calibri Light;
  width: 300px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:disabled {
    background-color: rgb(224 208 224);
    color: #000000;
    border-color: #cccccc;
  }

  &.right-align {
    text-align: right;
  }

  &.center-align {
    text-align: center;
  }
`;

const StyledTextBoxDetail = styled.input`
  width: 20% !important;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-family: calibri Light;
  width: 300px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:disabled {
    background-color: rgb(224 208 224);
    color: #000000;
    border-color: #cccccc;
  }

  &.right-align {
    text-align: right;
  }
`;

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    maxHeight: '400px', // กำหนดความสูงสูงสุดของ dropdown
  })
};


const Advisor = ({ onAction }) => {
  const location = useLocation();
  const [isShow, setisShow] = useState(false);
  const { loading,
    setloading,
    countAdvisor,
    setcountAdvisor,
    statusList,
    advisorList,
    setadvisorList,
    addAdvisor,
    handleChangeDetail,
    handleChangeDetailDropDown,
    GetHeader,
    STC_Header,
    GetAdvisor,
    OnSave,
    OnReset,
    delAdvisor,
    OnSendToResult } = Advisor_Fn();

  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      GetHeader(localStorage.getItem('SGAno'));
      GetAdvisor(localStorage.getItem('SGAno'));
      if (localStorage.getItem("ReqTypeAction") === 'ADD' || localStorage.getItem("ReqTypeAction") === 'EDIT') {
        setisShow(false)
      } else {
        setisShow(true)
      }
      setloading(false)
    }, 1000);
  }, [location]);


  const handleButtonSave = () => {
    OnSave();
    onAction(2, STC_Header.P_STATUS, STC_Header.P_STATUS_DESC, STC_Header.P_SGA_NO);
  }; //For Action Page main

  const [visible, setVisible] = useState(false);
  const [strMessage, setstrMessage] = useState('');

  const showConfirm = (Message) => {
    setstrMessage(Message);
    setVisible(true);
    console.log(Message);
  };

  const handleConfirm = () => {
    setVisible(false);
    OnSendToResult();
    // Handle confirm action here
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (<div>
    {loading ? (<div>
      <PageLoad></PageLoad>
    </div>) : (
      <div>
        <div className='dCenterADV'>
          <div style={{ width: '30%' }}>
            Manager Advisor : &nbsp;
            <StyledTextBoxDetail
              disabled={true}
              type="text"
              placeholder=""
              value={countAdvisor || 0}
              className="right-align"
            />
          </div>
          <div style={{ width: '70%' }}>
          </div>
        </div>


        <div className='dCenterADV'>
          <div className='dEmpIDADV' style={{ marginRight: '10px' }}>Employee ID.</div>
          <div className='dEmpNameADV' style={{ marginRight: '10px' }}>First - Last Name</div>
          <div className='dEmpLoginADV' style={{ marginRight: '10px' }}>Login ID.</div>
          <div className='dEmpStatusADV' style={{ marginRight: '10px' }}>Status</div>
          <div className='dAddADV'></div>
        </div>

        {advisorList.map((row) => (
          <div className='dCenterADV' style={{ marginBottom: '-1.5%' }}>
            <div className='dEmpIDDetailADV' style={{ marginRight: '10px' }}>
              <StyledTextBox
                disabled={localStorage.getItem('ReqAction') === 'APPROVE'}
                type="text"
                placeholder=""
                className="center-align"
                value={row.sgamg_manager || null}
                onChange={(e) => handleChangeDetail(row.id, 'sgamg_manager', e.target.value)}
              /></div>
            <div className='dEmpNameDetailADV' style={{ marginRight: '10px' }}>
              <StyledTextBox
                disabled={true}
                type="text"
                placeholder=""
                value={row.sgamg_manager_name || null}
                onChange={(e) => handleChangeDetail(row.id, 'sgamg_manager_name', e.target.value)}
              />
            </div>
            <div className='dEmpLoginDetailADV' style={{ marginRight: '10px' }}>
              <StyledTextBox
                disabled={true}
                type="text"
                placeholder=""
                value={row.sgamg_user || null}
                onChange={(e) => handleChangeDetail(row.id, 'sgamg_user', e.target.value)}
              />
            </div>
            <div className='dEmpStatusDetailADV' style={{ marginRight: '10px' }}>
              <StyledSelect className='react-selectADV'
                value={row.sgamg_status}
                // onChange={handleChangeStatus}
                onChange={(selectedOption) => handleChangeDetailDropDown(row.id, 'sgamg_status', selectedOption)}
                options={statusList}
                placeholder="Select"
                classNamePrefix="react-selectADV"
                isDisabled={localStorage.getItem('ReqAction') === 'APPROVE'}
              />
            </div>
            <div className='dAddDetailADV'>
              {/* {row.id === advisorList.length ? <button className="icon-buttonADDADV" onClick={addAdvisor}>
                <FontAwesomeIcon icon={faPlus} />
              </button> :
                <button className="icon-buttonDELADV" onClick={delAdvisor(row.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>} */}

              <button style={{display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'')}} className={row.id === advisorList.length ? "icon-buttonADDADV" : "icon-buttonDELADV"}
                onClick={row.id === advisorList.length ? addAdvisor : () => delAdvisor(row.id)}>
                {row.id === advisorList.length ?
                  <FontAwesomeIcon icon={faPlus} /> :

                  <FontAwesomeIcon icon={faTrash} />}
              </button>


            </div>
          </div>
        ))}

        <div className='dCenterADV' style={{ paddingTop: '2%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'') }}>
          <button className="custom-buttonADV" style={{ marginRight: '2%' }} onClick={handleButtonSave}>
            Save
          </button>
          <button className="custom-buttonResetADV" onClick={OnReset}>
            Reset
          </button>
        </div>

        {(STC_Header.P_SGA_FLAG  && localStorage.getItem("ReqAction") === 'REGISTER' ? <div className='dCenterRES' style={{ paddingTop: '2%' }}>
            <button className="custom-buttonSendRES" onClick={(e) => showConfirm('Do you want send to update result.')}>
              <FontAwesomeIcon icon={faPaperPlane} color='#ffffff' />  Send to update result
            </button>
          </div>

            : null)}
          <PopupConfirm
            visible={visible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message={strMessage}
          />


      </div>)}

  </div>
  )
}

export default Advisor