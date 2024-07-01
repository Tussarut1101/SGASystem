import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './Register.css';
import Select from 'react-select';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faRefresh, faPlus, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { GetFactory, GetPeriodType, GetCostCenter, Register_FN } from './Register_Fn';
import PopupConfirm from '../../Common/Popconfirm';

const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-selectREG__control {
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    font-size: 14px;
    font-family: calibri Light;

    background-color: ${({ isDisabled }) => isDisabled ? 'rgb(224 208 224)' : 'transparent'};
    color: ${({ isDisabled }) => isDisabled ? '#000000 !important' : 'inherit !important'};
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  }

  .react-selectREG__menu {
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextBox = styled.input`
  width: 85% !important;
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

const StyledTextBox2 = styled.input`
  width: 10% !important;
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
`;

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    maxHeight: '400px', // กำหนดความสูงสูงสุดของ dropdown
  })
};

const Register = ({ onAction }) => {
  const location = useLocation();
  const [isShow, setisShow] = useState(false);
  const { FactoryList, facList } = GetFactory();
  const { PeriodTypeList, perTypeList } = GetPeriodType();
  const { CostCenterList, ccList } = GetCostCenter();
  const {
    loading,
    setloading,
    STC_Header,
    setSTC_Header,
    handleChangeFac,
    handleChangePerType,
    handleChangeCC,
    handleInputChangeText,
    OnSave,
    OnReset,
    GetDataRegister,
    errors,
    OnSendToResult } = Register_FN();



  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      FactoryList();
      PeriodTypeList();
      CostCenterList();
      if (localStorage.getItem("ReqTypeAction") === 'ADD') {
        setisShow(false)
      } else {
        setisShow(true)
      }
      GetDataRegister(localStorage.getItem('SGAno'))
      setloading(false)
    }, 1000);
  }, [location]);


  useEffect(() => {
    const strFactory = facList.find(facList => facList.value === localStorage.getItem("emp_fac_code"));
    handleChangeFac(strFactory);
  }, [facList]);

  const handleButtonClickSave = () => {
    OnSave();
    onAction(0, STC_Header.P_STATUS, STC_Header.P_STATUS_DESC, STC_Header.P_SGA_NO) //SendValue : Tab,StatusCode,StatusDesc,SGAno
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

  return (
    <div>
      {loading ? (<div>
        <PageLoad></PageLoad>
      </div>) : (
        <div>
          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Factory :
              </div>
              <div className='dtdEndREG'>
                <StyledSelect className='react-selectREG'
                  value={STC_Header.P_FACTORY || null}
                  onChange={handleChangeFac}
                  options={facList}
                  placeholder="Select Factory..."
                  classNamePrefix="react-selectREG"
                  isDisabled={true}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
                SGA No. :
              </div>
              <div className='dtdEndEREG'>
                <StyledTextBox disabled
                  type="text"
                  placeholder=""
                  name='P_SGA_NO'
                  value={STC_Header.P_SGA_NO || ''}
                  onChange={handleInputChangeText}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                SGA Type :
              </div>
              <div className='dtdEndREG'>
                <StyledSelect className='react-selectREG'
                  value={STC_Header.P_PERIOD_TYPE || null}
                  onChange={handleChangePerType}
                  options={perTypeList}
                  placeholder="Select Type..."
                  classNamePrefix="react-selectREG"
                  isDisabled={isShow}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>

              </div>
              <div className='dtdEndEREG'>

              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>

          {errors.P_PERIOD_TYPE && <div className='dflexER'>
            <div className='dtdMidER'>
              <div className='dtdFristER'>
              </div>
              <div className='dtdEndER'>
                  <div style={{color: 'red'}}>{errors.P_PERIOD_TYPE}</div>
              </div>
            </div>
            <div className='dtdMidEER'>
              <div className='dtdFristEER'>

              </div>
              <div className='dtdEndEER'>

              </div>
              <div className='dtdEndENoneER'>
              </div>
            </div>
          </div>}

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                CC :
              </div>
              <div className='dtdEndREG'>
                <StyledSelect className='react-selectREG'
                  isMulti
                  options={ccList}
                  value={STC_Header.P_CC || null}
                  onChange={handleChangeCC}
                  placeholder="Select Cost Center..."
                  classNamePrefix="react-selectREG"
                  styles={customStyles}
                  isDisabled={false}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>

              </div>
              <div className='dtdEndEREG'>

              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>
          {errors.P_CC && <div className='dflexER'>
            <div className='dtdMidER'>
              <div className='dtdFristER'>
              </div>
              <div className='dtdEndER'>
                  <div style={{color: 'red'}}>{errors.P_CC}</div>
              </div>
            </div>
            <div className='dtdMidEER'>
              <div className='dtdFristEER'>

              </div>
              <div className='dtdEndEER'>

              </div>
              <div className='dtdEndENoneER'>
              </div>
            </div>
          </div>}


          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Team Name :
              </div>
              <div className='dtdEndREG'>
                <StyledTextBox
                  disabled={false}
                  type="text"
                  placeholder="Please enter your team name..."
                  // value={txtTeam}
                  // onChange={(e) => settxtTeam(e.target.value)}
                  name='P_TEAM'
                  value={STC_Header.P_TEAM || ''}
                  onChange={handleInputChangeText}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
                Theme :
              </div>
              <div className='dtdEndEREG'>
                <StyledTextBox
                  disabled={false}
                  type="text"
                  placeholder="Please enter your theme..."
                  name='P_THEME'
                  value={STC_Header.P_THEME || ''}
                  onChange={handleInputChangeText}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>
          {(errors.P_TEAM != null || errors.P_THEME != null) && 
          <div className='dflexER'>
            <div className='dtdMidER'>
              <div className='dtdFristER'>
              </div>
              <div className='dtdEndER'>
                  <div style={{color: 'red'}}>{errors.P_TEAM}</div>
              </div>
            </div>
            <div className='dtdMidEER'>
              <div className='dtdFristEER'>
              </div>
              <div className='dtdEndEER'>
              <div style={{color: 'red'}}>{errors.P_THEME}</div>
              </div>
              <div className='dtdEndENoneER'>
              </div>
            </div>
          </div>}
          {/* {errors.P_TEAM || errors.P_THEME && 
          <div className='dflexER'>
            <div className='dtdMidER'>
              <div className='dtdFristER'>
              </div>
              <div className='dtdEndER'>
                  <div style={{color: 'red'}}>{errors.P_TEAM}</div>
              </div>
            </div>
            <div className='dtdMidEER'>
              <div className='dtdFristEER'>

              </div>
              <div className='dtdEndEER'>
              <div style={{color: 'red'}}>{errors.P_THEME}</div>
              </div>
              <div className='dtdEndENoneER'>
              </div>
            </div>
          </div>} */}

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Mamager Advisor :
              </div>
              <div className='dtdEndREG'>
                <StyledTextBox2
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_ADVISOR || ''}
                  name='P_ADVISOR'
                  onChange={handleInputChangeText}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
                Member :
              </div>
              <div className='dtdEndEREG'>
                <StyledTextBox2
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_MEMBER || ''}
                  name='P_MEMBER'
                  onChange={handleInputChangeText}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Period :
              </div>
              <div className='dtdEndREG'>
                <StyledTextBox2
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_PERIOD || ''}
                  name='P_PERIOD'
                  onChange={handleInputChangeText}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
              </div>
              <div className='dtdEndEREG'>

              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Start Date :
              </div>
              <div className='dtdEndREG'>
                <StyledTextBox
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_START_DATE || ''}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
                End Date :
              </div>
              <div className='dtdEndEREG'>
                <StyledTextBox
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_END_DATE || ''}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              <div className='dtdFristREG'>
                Target Cost saving(THB) :
              </div>
              <div className='dtdEndREG'>
                <StyledTextBox
                  disabled={false}
                  type="text"
                  placeholder="Please fill in target cost saving..."
                  name='P_PLAN_COST'
                  value={STC_Header.P_PLAN_COST || ''}
                  onChange={handleInputChangeText}
                  min="0"
                  step="0.01"
                  className="right-align"
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              <div className='dtdFristEREG'>
                Total Actual saving(THB) :
              </div>
              <div className='dtdEndEREG'>
                <StyledTextBox
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_ACTUAL_COST || ''}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>
          {errors.P_PLAN_COST && <div className='dflexER'>
            <div className='dtdMidER'>
              <div className='dtdFristER'>
              </div>
              <div className='dtdEndER'>
                  <div style={{color: 'red'}}>{errors.P_PLAN_COST}</div>
              </div>
            </div>
            <div className='dtdMidEER'>
              <div className='dtdFristEER'>

              </div>
              <div className='dtdEndEER'>

              </div>
              <div className='dtdEndENoneER'>
              </div>
            </div>
          </div>}

          <div className='dflexREG'>
            <div className='dtdMidREG'>
              {localStorage.getItem("ReqTypeAction") === 'ADD' ? (<div className='dtdFristREG'>Create By : </div>) : (<div className='dtdFristREG'>Update By : </div>)}
              <div className='dtdEndREG'>
                <StyledTextBox
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_MODIFY_BY || ''}
                />
              </div>
            </div>
            <div className='dtdMidEREG'>
              {localStorage.getItem("ReqTypeAction") === 'ADD' ? (<div className='dtdFristREG'>Create Date : </div>) : (<div className='dtdFristREG'>Update Date : </div>)}
              <div className='dtdEndEREG'>
                <StyledTextBox
                  disabled={true}
                  type="text"
                  placeholder=""
                  value={STC_Header.P_MODIFY_DATE || ''}
                />
              </div>
              <div className='dtdEndENoneREG'>
              </div>
            </div>
          </div>
          <div className='dCenterREG' style={{ paddingTop: '2%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'')
           }}>
            <button className="custom-buttonREG" style={{ marginRight: '2%' }} onClick={handleButtonClickSave}>
              Save
            </button>
            <button className="custom-buttonResetREG" onClick={OnReset}>
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

export default Register