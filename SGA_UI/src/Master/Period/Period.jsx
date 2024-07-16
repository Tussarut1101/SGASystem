import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './Period.css';
import Select from 'react-select';
import styled from 'styled-components';
import { GetYear, Period_Fn } from './Period_Fn';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faRefresh, faPlus, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import Modal from 'react-modal';
import PopupConfirm from '../../Common/Popconfirm';

Modal.setAppElement('#root');
const StyledSelect = styled(Select)`
  width: 91% !important;
  .react-select__control {
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    font-family: calibri Light;

    background-color: ${({ isDisabled }) => isDisabled ? 'rgb(224 208 224)' : 'transparent'};
    color: ${({ isDisabled }) => isDisabled ? '#999999' : 'inherit'};
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  }

  .react-select__menu {
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
`;

function Period() {

  const location = useLocation();
  const { loading,
    setloading,
    selectedOptionYear,
    setSelectedOptionYear,
    handleChangeYear,
    perTypeList,
    setperTypeList,
    PeriodTypeList,
    selectedOptionPeriod,
    setSelectedOptionPeriod,
    handleChangePeriod,
    statusList,
    selectStatus,
    handleChangeStatus,
    GetData,
    genDetailTable,
    actionForm,
    STC_FORM,
    isOpenPopup,
    setisOpenPopup,
    GetDataForm,
    handleInputChangeText,
    handleChangeStatusForm,
    handleDateChangeStart,
    handleDateChangeEnd,
    OnSave,
    OnReset,
    OnDelete,
    OnReload } = Period_Fn();
  const { YearList, yearList } = GetYear();


  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      YearList();
      setloading(false)
    }, 1000);
  }, [location]);


  const closeModal = () => {
    setisOpenPopup(false);
  };

  const [Values, setValues] = useState({ event: '', year: '', code: '' });
  const [visible, setVisible] = useState(false);
  const [strMessage, setstrMessage] = useState('');

  const showConfirm = (event, year, code, Message) => {
    setValues({ event, year, code });
    setstrMessage(Message);
    setVisible(true);
  };

  const handleConfirm = () => {
    OnDelete(Values.year,Values.code)
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>{loading ? (
      <div>
        <PageLoad></PageLoad>
      </div>
    ) : (
      <div>
        <div>
          <Header></Header>
          <div className='dFrist'>
            <div className='dContent'>
              <div className='dTitle'>SGA Period Master</div>
              <div className='dSubTitle'>Period Maintain </div>
              <div className='dContentJobMain'>
                <div className='dContentJob'>
                  <div className='dflex'>
                    <div className='dtdMid'>
                      <div className='dtdFrist'>
                        Year :
                      </div>
                      <div className='dtdEnd'>
                        <StyledSelect className='react-select'
                          value={selectedOptionYear}
                          onChange={handleChangeYear}
                          options={yearList}
                          placeholder="Select an option"
                          classNamePrefix="react-select"
                          isDisabled={false}
                        />
                      </div>
                    </div>
                    <div className='dtdMid'>
                      <div className='dtdFristE'>
                        Period :
                      </div>
                      <div className='dtdEndE'>
                        <StyledSelect className='react-select'
                          value={selectedOptionPeriod}
                          onChange={handleChangePeriod}
                          options={perTypeList}
                          placeholder="Select an option"
                          classNamePrefix="react-select"
                          isDisabled={false}
                        />
                      </div>
                      <div className='dtdEndENone'>
                      </div>
                    </div>
                  </div>

                  <div className='dflex'>
                    <div className='dtdMid'>
                      <div className='dtdFrist'>
                        Status :
                      </div>
                      <div className='dtdEnd'>
                        <StyledSelect className='react-select'
                          value={selectStatus}
                          onChange={handleChangeStatus}
                          options={statusList}
                          placeholder="Select an option"
                          classNamePrefix="react-select"
                          isDisabled={false}
                        />
                      </div>
                    </div>
                    <div className='dtdMid'>
                      <div className='dtdFristE'>
                      </div>
                      <div className='dtdEndE'>
                        <button className="icon-buttonADDPMain">
                          <FontAwesomeIcon icon={faPlus} onClick={(e) => GetDataForm('NEW', '', '')} />
                        </button>
                        <button className="icon-buttonSearchP" onClick={GetData}>
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <button className="icon-buttonReP">
                          <FontAwesomeIcon icon={faRefresh} onClick={OnReload} />
                        </button>
                      </div>
                      <div className='dtdEndENone'>
                      </div>
                    </div>
                  </div>
                  <div className='dblank'></div>
                  {genDetailTable.length > 0 ? (
                    <div className='dCenter'>
                      <div className="grid-containerMain">
                        <table className="grid-tableMainP">
                          <thead>
                            <tr>
                              <th align='center' style={{ width: '100px' }}></th>
                              <th align='center' style={{ width: '100px' }}>Year</th>
                              <th align='left' style={{ width: '300px' }}>Period</th>
                              <th align='left' style={{ width: '150px' }}>Status</th>
                              <th align='center' style={{ width: '150px' }}>Start Date</th>
                              <th align='center' style={{ width: '150px' }}>End Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {genDetailTable.map((row) => (
                              <tr>
                                <td align='center'>
                                  <button className="icon-buttonEdit" >
                                    <FontAwesomeIcon icon={faPenClip} onClick={(e) => GetDataForm('EDIT', row.period_year, row.period_code)} />
                                  </button>
                                  <button className="icon-buttonDel">
                                    <FontAwesomeIcon icon={faTrash} onClick={(e) => showConfirm('DEL', row.period_year, row.period_code, 'Do you want confirm delete subject?')} />
                                  </button></td>
                                <td align='center'>{row.period_year}</td>
                                <td align='left'>{row.period_period}</td>
                                <td align='left'>{row.period_status}</td>
                                <td align='center'>{row.period_start_date}</td>
                                <td align='center'>{row.period_end_date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) :
                    (<div className='dCenter'><h2>No data dound</h2></div>)}

                </div>
              </div>
            </div>
          </div>


        </div>
        <Modal
          isOpen={isOpenPopup}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}  // ป้องกันการปิดเมื่อคลิกนอกโมดอล
          contentLabel="Example Modal"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <div className='dRigth'>
            <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', fontSize: '28px', cursor: 'pointer' }} onClick={closeModal} />
          </div>
          <div className='dflex'>
            <div className='dtdMidFP'>
              <div className='dtdFristP'>
                <label style={{ color: 'red' }}>*</label> &nbsp;Year :
              </div>
              <div className='dtdEndP'>
                <StyledTextBox
                  disabled={actionForm === 'EDIT'}
                  type="text"
                  placeholder=""
                  name='PERIOD_YEAR'
                  value={STC_FORM.PERIOD_YEAR || ''}
                  onChange={handleInputChangeText}
                />
              </div>
            </div>
            <div className='dtdMidEP'>
              <div className='dtdFristEP'>
              <label style={{ color: 'red' }}>*</label> &nbsp;Status :
              </div>
              <div className='dtdEndEP'>
                <StyledSelect className='react-select'
                  value={STC_FORM.PERIOD_STATUS}
                  onChange={handleChangeStatusForm}
                  options={statusList}
                  placeholder="Select an option"
                  classNamePrefix="react-select"
                  isDisabled={false}
                />
              </div>
              <div className='dtdEndENoneP'>
              </div>
            </div>
          </div>
          <div className='dflex'>
            <div className='dtdMidFP'>
              <div className='dtdFristP'>
              <label style={{ color: 'red' }}>*</label> &nbsp; Period :
              </div>
              <div className='dtdEndP'>
                <StyledTextBox
                  disabled={actionForm === 'EDIT'}
                  type="text"
                  placeholder=""
                  name='PERIOD_CODE'
                  value={STC_FORM.PERIOD_CODE || ''}
                  onChange={handleInputChangeText}
                />
              </div>
            </div>
            <div className='dtdMidEP'>
              <div className='dtdFristEP'>
              <label style={{ color: 'red' }}>*</label> &nbsp; Description :
              </div>
              <div className='dtdEndEP'>
                <StyledTextBox
                  type="text"
                  placeholder=""
                  name='PERIOD_DESC'
                  value={STC_FORM.PERIOD_DESC || ''}
                  onChange={handleInputChangeText}
                />
              </div>
              <div className='dtdEndENoneP'>
              </div>
            </div>
          </div>
          <div className='dflex'>
            <div className='dtdMidFP'>
              <div className='dtdFristP'>
              <label style={{ color: 'red' }}>*</label> &nbsp; Start Date :
              </div>
              <div className='dtdEndP'>
                <div className="datepicker-container">
                  <DatePicker
                    selected={STC_FORM.PERIOD_START_DATE}
                    onChange={handleDateChangeStart}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                    className="custom-datepickerPP"
                  />
                  <FontAwesomeIcon icon={faCalendarAlt} className="datepickerPP-icon" />
                </div>
              </div>
            </div>
            <div className='dtdMidEP'>
              <div className='dtdFristEP'>
              <label style={{ color: 'red' }}>*</label> &nbsp; End Date :
              </div>
              <div className='dtdEndEP'>
                <div className="datepicker-container">
                  <DatePicker
                    selected={STC_FORM.PERIOD_END_DATE}
                    onChange={handleDateChangeEnd}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                    className="custom-datepickerPPTo"
                  />
                  <FontAwesomeIcon icon={faCalendarAlt} className="datepickerPP-iconTo" />
                </div>
              </div>
              <div className='dtdEndENoneP'>
              </div>
            </div>
          </div>
          <div className='dblankPop'></div>
          <div className='dflex' style={{ justifyContent: 'center' }}>
            <div className='dBGPer'>
              <div className='dBGPerDetail'>
                <div className='d20Per'>
                  Period
                </div>
                <div className='d40Per'>
                  Start Date
                </div>
                <div className='d40Per'>
                  End Date
                </div>
              </div>
              {STC_FORM.PERIOD_DETAIL.map((row) => (
                <div className='dBGPerDetail'>
                  <div className='d20PerDetail'>
                    {row.PD_SEQ}
                  </div>
                  <div className='d40PerDetail'>
                    {row.PD_START_DATE}
                  </div>
                  <div className='d40PerDetail'>
                    {row.PD_END_DATE}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='dCenter' style={{ paddingTop: '1%' }}>
            <button className="custom-buttonPop" style={{ marginRight: '2%' }} onClick={OnSave}>
              Save
            </button>
            <button className="custom-buttonResetPop" onClick={OnReset}>
              Reset
            </button>
          </div>

        </Modal>
      </div>
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

export default Period