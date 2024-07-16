import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './Activity.css';
import Select from 'react-select';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faRefresh, faPlus, faPenClip, faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { Activity_Fn } from './Activity_Fn';
import PopupConfirm from '../../Common/Popconfirm';

const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-selectMEM__control {
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

  .react-selectMEM__menu {
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
`;

const StyledTextBox = styled.input`
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

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  font-family: calibri Light;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &:disabled {
    background-color: #E0E9E7;
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

const Monitor = ({ onAction }) => {

  const location = useLocation();
  const [isShow, setisShow] = useState(false);
  const { loading,
    setloading,
    STC_Header,
    GetHeader,
    setSTC_Header,
    ActList,
    GetActivity,
    addActivity,
    handleChangeDetail,
    delActivity,
    OnSave,
    OnReset,
    OnSendToResult,
    MonthList,
    GetMonth } = Activity_Fn();

  useEffect(() => {
    setloading(true)

    setTimeout(() => {
      GetHeader(localStorage.getItem('SGAno'));
      GetMonth(localStorage.getItem('SGAno'));
      GetActivity(localStorage.getItem('SGAno'));
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

  return (
    <div>
      {loading ? (<div>
        <PageLoad></PageLoad>
      </div>) : (
        <div>

          <div className='dCenterMEM'>
            <div className='dActHeader' style={{ width: '5%', textAlign: 'center' }}>No.</div>
            <div className='dActHeader' style={{ width: '42%', textAlign: 'left' }}>Activity</div>
            {MonthList.map((row) => (
              <div className='dActHeader' style={{ width: '8%', textAlign: 'center' }}>{row.p_month}</div>
            ))}
            <div style={{ width: '5%', textAlign: 'center' }}></div>
          </div>
          {ActList.map((row) => (
            <div style={{ display: 'block', width: '100%' }}>
              <div className='dCenterAct'>
                <div className='dActDetail' style={{ width: '5%', textAlign: 'center' }}>
                  <StyledTextBox
                    disabled={true}
                    type="text"
                    placeholder=""
                    className='dNoAct'
                    value={row.p_sga_seq}
                  />
                </div>
                <div className='dActDetail2' style={{ width: '44%', textAlign: 'left' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '78%', justifyContent: 'flex-start'}}>
                      <TextArea
                        disabled={localStorage.getItem('ReqAction') === 'APPROVE'}
                        className='dActTextArear'
                        type="text"
                        placeholder=""
                        name='p_sga_subject'
                        value={row.p_sga_subject || null}
                        onChange={(e) => handleChangeDetail(row.id, 'p_sga_subject', e.target.value)}
                      />
                    </div>
                    <div style={{ width: '22%', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'block' }}>
                        <div style={{ margin: '0rem 0.1rem 0.2rem 0.1rem' }}>
                          <StyledTextBox
                            disabled={true}
                            type="text"
                            placeholder=""
                            className='dtextStatus'
                            value='Estimate'
                          />

                        </div>
                        <div style={{ margin: '0rem 0.1rem 0.2rem 0.1rem' }}>
                          <StyledTextBox
                            disabled={true}
                            type="text"
                            placeholder=""
                            className='dtextStatus'
                            value='Actual'
                          />

                        </div>
                        <div style={{ margin: '0.1rem 0.1rem 0rem 0.1rem' }}>
                          <StyledTextBox
                            disabled={true}
                            type="text"
                            placeholder=""
                            className='dtextStatus'
                            value='Status'
                          />
                        </div>
                      </div>
                    </div>
                  </div>



                </div>
                {MonthList.map((rowM, index) => (
                  <div className='dActDetail' style={{ width: '8%', textAlign: 'center' }}>
                    <div style={{ margin: '0rem 0.1rem 0.2rem 0.1rem' }}>
                    <StyledTextBox
                      disabled={localStorage.getItem('ReqAction') === 'APPROVE'}
                      type="text"
                      placeholder=""
                      className='dTitleMonthAct'
                      value={row[`p_month_es_${index + 1}`]}
                      onChange={(e) => handleChangeDetail(row.id, `p_month_es_${index + 1}`, e.target.value)}
                    />
                   </div>
                   <div style={{ margin: '0rem 0.1rem 0.2rem 0.1rem' }}>
                    <StyledTextBox
                      disabled={localStorage.getItem('ReqAction') === 'APPROVE'}
                      type="text"
                      placeholder=""
                      className='dTitleMonthAct'
                      value={row[`p_month_ac_${index + 1}`]}
                      onChange={(e) => handleChangeDetail(row.id, `p_month_ac_${index + 1}`, e.target.value)}
                    />
                   </div>
                   <div style={{ margin: '0rem 0.1rem 0.2rem 0.1rem' }}>
                    <StyledTextBox
                      disabled={localStorage.getItem('ReqAction') === 'APPROVE'}
                      type="text"
                      placeholder=""
                      className='dTitleMonthAct'
                      value={row[`p_month_sts_${index + 1}`]}
                      onChange={(e) => handleChangeDetail(row.id, `p_month_sts_${index + 1}`, e.target.value)}
                    />
                   </div>
                  </div>
                ))}

                <div style={{ width: '5%' }}>
                  <button className={row.id === ActList.length ? "icon-buttonADDMEM" : "icon-buttonDELMEM"} style={{ display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' : ''),height: '120px', marginTop: '0.1rem' }} 
                    onClick={row.id === ActList.length ? addActivity : () => delActivity(row.id)}>
                    {row.id === ActList.length ?
                      <FontAwesomeIcon icon={faPlus} /> :

                      <FontAwesomeIcon icon={faTrash} color='#ffffff' />}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className='dCenterMEM' style={{ paddingTop: '2%',  display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' : '') }}>
            <button className="custom-buttonMEM" style={{ marginRight: '2%' }} onClick={handleButtonSave}>
              Save
            </button>
            <button className="custom-buttonResetMEM" onClick={OnReset}>
              Reset
            </button>
          </div>

          {(STC_Header.P_SGA_FLAG && localStorage.getItem("ReqAction") === 'REGISTER' ? <div className='dCenterRES' style={{ paddingTop: '2%' }}>
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

export default Monitor