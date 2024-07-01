import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import PopupConfirm from '../../Common/Popconfirm';
import './Result.css';
import Select from 'react-select';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faKeyboard, faChevronLeft, faCaretUp, faCaretDown, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { Result_Fn } from './Result_Fn';

const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-selectRES__control {
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

  .react-selectRES__menu {
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

const StyledTextBox2 = styled.input`
  width: 70% !important;
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

const StyledTextBox3 = styled.input`
  width: 40% !important;
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

const Result = ({ onAction }) => {
  const location = useLocation();
  const [isShow, setisShow] = useState(false);
  const { loading,
    setloading,
    countPeriod,
    setcountPeriod,
    STC_Header,
    setSTC_Header,
    GetHeader,
    planList,
    setplanList,
    GetPlanResult,
    handleChangeDetail,
    OnSave,
    OnReset,
    OnSendToResult,
    STC_SHOW_HEAD,
    setSTC_SHOW_HEAD,
    OnOpenResult,
    OnCloseResult,
    resultDetailList,
    OnHideResult,
    handleChangeResult,
    OnSaveResult,
    checkSenApprove,
    isSendApprove,
    OnSendToMGR,
    OnApproveOrReject,
    OnResetResult } = Result_Fn();

  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      GetHeader(localStorage.getItem('SGAno'));
      GetPlanResult(localStorage.getItem('SGAno'));
      if (localStorage.getItem("ReqTypeAction") === 'ADD' || localStorage.getItem("ReqTypeAction") === 'EDIT') {
        setisShow(false)
      } else {
        setisShow(true)
      }
      setloading(false)
    }, 1000);
  }, [location]);

  useEffect(() => {
    if (planList.length > 0) {
      checkSenApprove();
    }
  }, [planList]);



  const [visible, setVisible] = useState(false);
  const [strMessage, setstrMessage] = useState('');
  const [strType, setstrType] = useState('');
  const [STC_ROUT, setSTC_ROUT] = useState({
    R_TYPE: '',
    R_PERIOD: 0,
    R_COMMENT: ''
  });

  const showConfirm = (Message, type) => {
    setstrMessage(Message);
    setstrType(type);
    setVisible(true);
  };

  const showConfirmAppOrReject = (Message, type, typeApp, Comment, period) => {
    if (typeApp === 'R' && (Comment === null || Comment === '' || Comment === ' ')) {
      alert('Please fill in comment...')
    } else {
      setstrMessage(Message);
      setstrType(type);
      setSTC_ROUT({
        R_TYPE: typeApp,
        R_PERIOD: period,
        R_COMMENT: Comment
      });
      setVisible(true);
    }

  };

  const handleConfirm = () => {
    setVisible(false);
    if (strType === 'SENDTOUPDATE') {
      OnSendToResult();
    } else if (strType === 'SENDTOMGR') {
      OnSendToMGR();
    } else if (strType === 'APPROVEORREJECT') {
      OnApproveOrReject(STC_ROUT.R_TYPE, STC_ROUT.R_COMMENT, STC_ROUT.R_PERIOD);
    }


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
        
        (STC_SHOW_HEAD.R_OPEN === false ? <div>
          <div className='dCenterRES'>
            <div style={{ width: '30%' }}>
              SGA Total period : &nbsp;
              <StyledTextBoxDetail
                disabled={true}
                type="text"
                placeholder=""
                value={STC_Header.P_PERIOD || 0}
                className="right-align"
              />
            </div>
            <div style={{ width: '70%' }}>
            </div>
          </div>
          <div className='dCenterRES'>
            <div className='d10RES' style={{ marginRight: '10px' }}>Period</div>
            <div className='d20RES' style={{ marginRight: '10px' }}>Start Date</div>
            <div className='d20RES' style={{ marginRight: '10px' }}>End Date</div>
            <div className='d15RES' style={{ marginRight: '10px' }}>Action Plan</div>
            <div className='d15RES' style={{ marginRight: '10px' }}>Actual</div>
            <div className='d10RES' style={{ marginRight: '10px' }}>Update By</div>
            <div className='d10RES'>Update Date</div>
          </div>
          {planList.map((row) => (
            <div>
              <div className='dCenterRES' style={{ marginBottom: '-1.5%' }}>
                <div className='d10DetailRES' style={{ marginRight: '10px' }}>
                  <div className='dHeadPeriod'><label>{row.sgare_period_seq}</label></div>
                </div>
                <div className='d20DetailRES' style={{ marginRight: '10px' }}>
                  <label>{row.sgare_start_date}</label>
                </div>
                <div className='d20DetailRES' style={{ marginRight: '10px' }}>
                  <label>{row.sgare_end_date}</label>
                </div>
                <div className='d15DetailRES' style={{ marginRight: '10px' }}>
                  <StyledTextBox
                    disabled={false}
                    type="text"
                    placeholder=""
                    className="right-align"
                    value={row.sgare_total_plan || null}
                    onChange={(e) => handleChangeDetail(row.sgare_period_seq, 'sgare_total_plan', e.target.value)}
                  />
                </div>
                <div className='d15Detail2RES' style={{ marginRight: '10px' }}>
                  <StyledTextBox2
                    disabled={true}
                    type="text"
                    placeholder=""
                    className="right-align"
                    value={row.sgare_total_actual || null}
                    onChange={(e) => handleChangeDetail(row.sgare_period_seq, 'sgare_total_actual', e.target.value)}
                  />
                  &nbsp;&nbsp;
                  {(row.sgare_period_seq === 1 && (STC_Header.P_STATUS === 'S40' || STC_Header.P_STATUS === 'S60N')) ||
                    (row.sgare_period_seq === 2 && (STC_Header.P_STATUS === 'S60' || STC_Header.P_STATUS === 'S80N')) ||
                    (row.sgare_period_seq === 3 && (STC_Header.P_STATUS === 'S80' || STC_Header.P_STATUS === 'S100N')) ||
                    (row.sgare_period_seq === 4 && (STC_Header.P_STATUS === 'S100' || STC_Header.P_STATUS === 'S120N')) ||
                    (row.sgare_period_seq === 5 && (STC_Header.P_STATUS === 'S120' || STC_Header.P_STATUS === 'S140N')) ||
                    (row.sgare_period_seq === 6 && (STC_Header.P_STATUS === 'S140' || STC_Header.P_STATUS === 'S160N'))
                    ?
                    <button id='Open' className="custom-buttonOpenRES" onClick={(e) => OnOpenResult('UPDATE', row.sgare_period_seq, row.sgare_start_date, row.sgare_end_date, row.sgare_total_plan)}>
                      <FontAwesomeIcon icon={faKeyboard} color='#ED7D1A' />
                    </button>
                    :

                    <button id='black' className="custom-buttonOpenRES" onClick={row.sgare_modify_date === '' || row.sgare_modify_date === ' ' || row.sgare_modify_date === null ? null :
                      localStorage.getItem('ReqAction') === 'UPDATE' ? () => OnOpenResult('UPDATE', row.sgare_period_seq, row.sgare_start_date, row.sgare_end_date, row.sgare_total_plan) : () => OnOpenResult('VIEW', row.sgare_period_seq, row.sgare_start_date, row.sgare_end_date, row.sgare_total_plan)}>
                      {row.sgare_modify_date === '' || row.sgare_modify_date === ' ' || row.sgare_modify_date === null ?
                        <FontAwesomeIcon icon={faEye} color='transparent' /> :
                        (localStorage.getItem('ReqAction') === 'APPROVE' ? <FontAwesomeIcon icon={faEye} color='#48C9B0' /> : <FontAwesomeIcon icon={faKeyboard} color='#ED7D1A' />)
                      }


                    </button>}

                </div>
                <div className='d10DetailRES' style={{ marginRight: '10px' }}>
                  <label>{row.sgare_modify_by_desc}</label>
                </div>
                <div className='d10DetailRES'>
                  <label>{row.sgare_modify_date}</label>
                </div>
              </div>

              {(row.sgare_period_seq === 1 && (STC_Header.P_STATUS === 'S50' || STC_Header.P_STATUS === 'S60N')) ||
                (row.sgare_period_seq === 2 && (STC_Header.P_STATUS === 'S70' || STC_Header.P_STATUS === 'S80N')) ||
                (row.sgare_period_seq === 3 && (STC_Header.P_STATUS === 'S90' || STC_Header.P_STATUS === 'S100N')) ||
                (row.sgare_period_seq === 4 && (STC_Header.P_STATUS === 'S110' || STC_Header.P_STATUS === 'S120N')) ||
                (row.sgare_period_seq === 5 && (STC_Header.P_STATUS === 'S130' || STC_Header.P_STATUS === 'S140N')) ||
                (row.sgare_period_seq === 6 && (STC_Header.P_STATUS === 'S150' || STC_Header.P_STATUS === 'S160N'))
                ?
                <div className='dCenterRES' style={{ marginBottom: '-1.5%' }}>
                  <div className='d10DetailRigthRES' style={{ marginRight: '10px' }}>
                    <label>Comment : </label>
                  </div>
                  <div className='d80DetailRES' style={{ marginRight: '10px' }}>
                    <StyledTextBox
                      disabled={((row.sgare_period_seq === 1 && STC_Header.P_STATUS === 'S50')) ||
                        ((row.sgare_period_seq === 2 && STC_Header.P_STATUS === 'S70')) ||
                        ((row.sgare_period_seq === 3 && STC_Header.P_STATUS === 'S90')) ||
                        ((row.sgare_period_seq === 4 && STC_Header.P_STATUS === 'S110')) ||
                        ((row.sgare_period_seq === 5 && STC_Header.P_STATUS === 'S130')) ||
                        ((row.sgare_period_seq === 6 && STC_Header.P_STATUS === 'S150')) ? false : true}
                      type="text"
                      placeholder=""
                      value={row.sgare_remark || null}
                      onChange={(e) => handleChangeDetail(row.sgare_period_seq, 'sgare_remark', e.target.value)}
                    />
                  </div>
                  <div className='d10DetailRES' style={{ marginRight: '10px' }}>
                    {((row.sgare_period_seq === 1 && STC_Header.P_STATUS === 'S50')) ||
                      ((row.sgare_period_seq === 2 && STC_Header.P_STATUS === 'S70')) ||
                      ((row.sgare_period_seq === 3 && STC_Header.P_STATUS === 'S90')) ||
                      ((row.sgare_period_seq === 4 && STC_Header.P_STATUS === 'S110')) ||
                      ((row.sgare_period_seq === 5 && STC_Header.P_STATUS === 'S130')) ||
                      ((row.sgare_period_seq === 6 && STC_Header.P_STATUS === 'S150')) ?
                      <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '28px', cursor: 'pointer' }} onClick={(e) => showConfirmAppOrReject('Do you want approve period ' + row.sgare_period_seq + '.', 'APPROVEORREJECT', 'A', row.sgare_remark, row.sgare_period_seq)} />
                      : null}
                  </div>
                  <div className='d10DetailRES'>
                    {((row.sgare_period_seq === 1 && STC_Header.P_STATUS === 'S50')) ||
                      ((row.sgare_period_seq === 2 && STC_Header.P_STATUS === 'S70')) ||
                      ((row.sgare_period_seq === 3 && STC_Header.P_STATUS === 'S90')) ||
                      ((row.sgare_period_seq === 4 && STC_Header.P_STATUS === 'S110')) ||
                      ((row.sgare_period_seq === 5 && STC_Header.P_STATUS === 'S130')) ||
                      ((row.sgare_period_seq === 6 && STC_Header.P_STATUS === 'S150')) ?
                      <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '28px', cursor: 'pointer' }} onClick={(e) => showConfirmAppOrReject('Do you want reject period ' + row.sgare_period_seq + '.', 'APPROVEORREJECT', 'R', row.sgare_remark, row.sgare_period_seq)} />
                      : null}


                  </div>
                </div>
                :
                null}



            </div>
          ))}

          <div className='dCenterRES' style={{ paddingTop: '2%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' : '') }}>
            <button className="custom-buttonRES" style={{ marginRight: '2%' }} onClick={OnSave}>
              Save
            </button>
            <button className="custom-buttonResetRES" onClick={OnReset}>
              Reset
            </button>
          </div>
          {isSendApprove ?
            <button className="custom-buttonUpRES" onClick={(e) => showConfirm('Do you want send result to MGR. approve', 'SENDTOMGR')}>
              <FontAwesomeIcon icon={faPaperPlane} color='#b317bb' />  Send to MGR approve resullt
            </button>
            : null}

          {(STC_Header.P_SGA_FLAG && localStorage.getItem("ReqAction") === 'REGISTER' ? <div className='dCenterRES' style={{ paddingTop: '2%' }}>
            <button className="custom-buttonSendRES" onClick={(e) => showConfirm('Do you want send to update result.', 'SENDTOUPDATE')}>
              <FontAwesomeIcon icon={faPaperPlane} color='#ffffff' />  Send to update result
            </button>
          </div>
            : null)}
        </div> :

          <div>
            <div className='dCenterRES'>
              <div className='dCenterBackCURSORRES' onClick={OnCloseResult}>
                <button className="custom-buttonCloseRES">
                  <FontAwesomeIcon icon={faChevronLeft} color='#ffffff' />
                </button>&nbsp;&nbsp;<div style={{
                  color: 'blue',
                  fontWeight: 'bold'
                }}>Back to plan result... </div>

              </div>
              <div style={{ width: '50%' }}>
              </div>
            </div>

            <div className='dCenterRES'>
              <div className='dCenterBackRES'>
                <div className='dHeadShow'>
                  <div className='dSubHeadShow'>
                    Period
                  </div>
                  <div className='dCustomdot'></div>
                </div>
                <div className='dHeadShow'>

                  <div className='dSubHeadShow'>
                    Start Date
                  </div>
                  <div className='dCustomdot'></div>
                </div>
                <div className='dHeadShow'>

                  <div className='dSubHeadShow'>
                    End Date
                  </div>
                  <div className='dCustomdot'></div>
                </div>
                <div className='dHeadShow'>

                  <div className='dSubHeadShow'>
                    Action Plan
                  </div>
                  <div className='dCustomdot'></div>
                </div>
              </div>
            </div>
            <div className='dCenterRES'>
              <div className='dCenterBackRES'>
                <div className='dHeadShow'>
                  {STC_SHOW_HEAD.R_PERIOD}
                </div>
                <div className='dHeadShow'>
                  {STC_SHOW_HEAD.R_SDATE}
                </div>
                <div className='dHeadShow'>
                  {STC_SHOW_HEAD.R_EDATE}
                </div>
                <div className='dHeadShowR'>
                  {STC_SHOW_HEAD.R_COST}
                </div>
              </div>
            </div>

            {resultDetailList.map((row, indexMain) => (
              <div key={indexMain}>
                <div className='dCenterRES'>
                  <div className='dCenterLeftRES'>
                    <div className='dHeadGroupLeft'>
                      {row.sgap_subject}
                    </div>
                    <div className='dHeadGroup'>
                      {row.sgap_type_desc}
                    </div>
                    <div className='dHeadGroupTemp'>
                    </div>
                    <div className='dHeadGroupIcon'>
                      <button className="custom-buttonGroup" onClick={(e) => row.open_group === true ? OnHideResult(row.sgap_seq, 'open_group', false) : OnHideResult(row.sgap_seq, 'open_group', true)} >
                        {row.open_group === true ?
                          <FontAwesomeIcon icon={faCaretDown} color='#8b1e8b' style={{ fontSize: '28px' }} /> :
                          <FontAwesomeIcon icon={faCaretUp} color='#8b1e8b' style={{ fontSize: '28px' }} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: (row.open_group ? '' : 'none') }}>
                  {Array.isArray(row.stc_trans_result_detail) ? (
                    <div>
                      <div className='dCenterRES' >
                        <div className='d40RES'>
                          Item
                        </div>
                        <div className='d60RES'>
                          Result
                        </div>
                      </div>
                      {row.stc_trans_result_detail.map((rowD) => (
                        <div className='dCenterRES' style={{ marginBottom: '-1%' }}>
                          <div className='d40DetailRES'>
                            {rowD.SGARED_CODE_DESC} &nbsp; :
                          </div>
                          <div className='d60DetailRES'>
                            <StyledTextBox3
                              disabled={STC_SHOW_HEAD.R_EVEN === 'UPDATE' ? false : true}
                              type="text"
                              placeholder=""
                              className="right-align"
                              value={rowD.SGARED_RESULT}
                              onChange={(e) => handleChangeResult(rowD.SGARED_SEQ, rowD.SGARED_TYPE_CODE, rowD.SGARED_CODE, 'SGARED_RESULT', rowD.SGARED_COST_TARGET, e.target.value)}
                            />
                            &nbsp;&nbsp;<div style={{ color: 'red' }}>{(rowD.SGARED_COST_SAVING_FLAG === 'O' || rowD.SGARED_COST_SAVING_FLAG === 'Y' ? '*' : '')}</div>
                          </div>
                        </div>
                      ))}


                    </div>
                  ) : (<div className='dCenterRES' >
                    Data not fond.
                  </div>)}

                </div>

              </div>
            ))}

            <div className='dCenterRES' style={{
              paddingTop: '2%', display: (STC_SHOW_HEAD.R_EVEN === 'UPDATE' ? '' : 'none')
            }}>
              <button className="custom-buttonRES" style={{ marginRight: '2%' }} onClick={(e) => OnSaveResult(STC_SHOW_HEAD.R_PERIOD)}>
                Save
              </button>
              <button className="custom-buttonResetRES" onClick={(e) => OnResetResult(STC_SHOW_HEAD.R_PERIOD)}>
                Reset
              </button>
            </div>
          </div>)


      )}

      <PopupConfirm
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={strMessage}
      />

    </div>
  )
}

export default Result