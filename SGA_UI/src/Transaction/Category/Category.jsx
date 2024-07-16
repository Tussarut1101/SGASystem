import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './Category.css';
import Select from 'react-select';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faRefresh, faPlus, faPenClip, faPenAlt, faTrash, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { GetCategory, Category_Fn } from './Category_Fn';
import PopupConfirm from '../../Common/Popconfirm';

const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-selectCATE__control {
    border: 1px solid #ddd;
    padding: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    font-size: 14px;
    font-family: calibri Light;

    background-color: ${({ isDisabled }) => isDisabled ? 'rgb(224 208 224)' : 'transparent'};
    color: ${({ isDisabled }) => isDisabled ? '#999999' : 'inherit'};
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  }

  .react-selectCATE__menu {
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

  &.center-align {
    text-align: center;
  }
`;

const StyledTextBoxDetail = styled.input`
  width: 90% !important;
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

const Category = ({ onAction }) => {

  const location = useLocation();
  const [isShow, setisShow] = useState(false);
  const { CategoryList, categoryList } = GetCategory();
  const { loading,
    setloading,
    isSelect,
    setisSelect,
    txtSubject,
    settxtSubject,
    selectCategory,
    setselectCategory,
    handleInputChangeText,
    handleChangeCategory,
    categoryDetailList,
    setcategoryDetailList,
    handleChangeDetail,
    handleInputCancelDetail,
    categoryMainlList,
    setcategoryMainlList,
    GetCateMainTrans,
    EditCategory,
    GetHeader,
    STC_Header,
    setaction,
    OnSave,
    OnReset,
    action,
    OnSendToResult } = Category_Fn();

  useEffect(() => {
    if (localStorage.getItem('SGAno') === null || localStorage.getItem('SGAno') === '' || localStorage.getItem('SGAno') === ' ') {
      onAction(0, '', '', localStorage.getItem('SGAno'));
    }
    setloading(true)
    setTimeout(() => {
      setaction('ADD')
      CategoryList();
      GetHeader(localStorage.getItem('SGAno'));
      GetCateMainTrans(localStorage.getItem('SGAno')); //SGA no
      if (localStorage.getItem("ReqTypeAction") === 'ADD') {
        setisShow(false)
      } else {
        setisShow(true)
      }
      setloading(false)
    }, 1000);

  }, [location]);

  const handleButtonSave = () => {
    console.log(STC_Header);
    onAction(3, STC_Header.P_STATUS, STC_Header.P_STATUS_DESC, STC_Header.P_SGA_NO);
  }; //For Action Page main

  const [Values, setValues] = useState({ event: '', SGAno: '', Seq: 0, Subject: '', Category: '', Desc: '' });
  const [visible, setVisible] = useState(false);
  const [strMessage, setstrMessage] = useState('');

  const showConfirm = (event, SGAno, Seq, Subject, Category, Desc,Message) => {
    setValues({ event, SGAno, Seq, Subject, Category, Desc });
    setstrMessage(Message);
    setVisible(true);
  };


  const handleConfirm = () => {
    if (Values.event === 'DEL'){
      EditCategory(Values.event, Values.SGAno, Values.Seq, Values.Subject, Values.Category, Values.Desc)
    }else{
      OnSendToResult()
    }
    setVisible(false);
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
          <div className='dflexCATE'>
            <div className='dtdMidCATE'>
              <div className='dtdFristCATE'>
                Subject :
              </div>
              <div className='dtdEndCATE'>
                <StyledTextBox
                  disabled={isSelect}
                  type="text"
                  placeholder=""
                  name='txtSubject'
                  value={txtSubject || ''}
                  onChange={(e) => settxtSubject(e.target.value)}
                />
              </div>
            </div>
            <div className='dtdMidECATE'>
              <div className='dtdFristECATE'>
                Category :
              </div>
              <div className='dtdEndECATE'>
                <StyledSelect className='react-selectCATE'
                  value={selectCategory || null}
                  onChange={handleChangeCategory}
                  options={categoryList}
                  placeholder="Select category..."
                  classNamePrefix="react-selectCATE"
                  isDisabled={isSelect}
                />
              </div>
              <div className='dtdEndENoneCATE'>
              </div>
            </div>
          </div>

          {categoryDetailList.length > 0 ? (
            <div>
              <div className='dflexCATE'>
                <div className='dCategorySCATE'>
                  {selectCategory === null ? (null) : (<div className='dCateHeadCATE'>{selectCategory.label}</div>)}
                </div>

                <div className='dCategoryMCATE'>
                  <div className='dCateNameCATE'>
                    Before
                  </div>
                </div>
                <div className='dCategoryMCATE'>
                  <div className='dCateNameCATE'>
                    1Q Target
                  </div>

                </div>
                <div className='dCategoryMCATE'>
                  <div className='dCateNameCATE'>
                    2Q Target
                  </div>

                </div>
                <div className='dCategoryMCATE'>
                  <div className='dCateNameCATE'>
                    Target All
                  </div>

                </div>
                <div className='dCategoryECATE'>
                  <div style={{ textAlign: 'left' }}> <FontAwesomeIcon icon={faTimesCircle} color="red" size="2x" onClick={handleInputCancelDetail} /></div>
                </div>
              </div>

              {categoryDetailList.map((row) => (
                <div className='dflexDetailCATE'>
                  <div className='dCategorySCATE'>
                    {row.sgap_desc} :
                  </div>

                  <div className='dCategoryMCATE'>
                    <StyledTextBoxDetail
                      disabled={(action === 'VIEW' ? true : row.sgap_before_is)}
                      type="text"
                      placeholder=""
                      value={row.sgap_before || (row.sgap_before_is === false ? 0 : null)}
                      onChange={(e) => handleChangeDetail(row.sgap_code, 'sgap_before', e.target.value)}
                      className="right-align"
                    />
                    <div style={{
                      marginLeft: '5px',
                      marginRight: '5px',
                      color: 'red'
                    }}>{row.sgap_before_is_mdt === true ? '*' : <>&nbsp;&nbsp;</>}</div>
                  </div>
                  <div className='dCategoryMCATE'>
                    <StyledTextBoxDetail
                      disabled={(action === 'VIEW' ? true : row.sgap_1q_target_is)}
                      type="text"
                      placeholder=""
                      value={row.sgap_1q_target || (row.sgap_1q_target_is === false ? 0 : null)}
                      onChange={(e) => handleChangeDetail(row.sgap_code, 'sgap_1q_target', e.target.value)}
                      className="right-align"
                    />
                    <div style={{
                      marginLeft: '5px',
                      marginRight: '5px',
                      color: 'red'
                    }}>{row.sgap_1q_target_is_mdt === true ? '*' : <>&nbsp;&nbsp;</>}</div>
                  </div>
                  <div className='dCategoryMCATE'>
                    <StyledTextBoxDetail
                      disabled={(action === 'VIEW' ? true : row.sgap_2q_target_is)}
                      type="text"
                      placeholder=""
                      value={row.sgap_2q_target || (row.sgap_2q_target_is === false ? 0 : null)}
                      onChange={(e) => handleChangeDetail(row.sgap_code, 'sgap_2q_target', e.target.value)}
                      className="right-align"
                    />
                    <div style={{
                      marginLeft: '5px',
                      marginRight: '5px',
                      color: 'red'
                    }}>{row.sgap_2q_target_is_mdt === true ? '*' : <>&nbsp;&nbsp;</>}</div>
                  </div>
                  <div className='dCategoryMCATE'>
                    <StyledTextBoxDetail
                      disabled={(action === 'VIEW' ? true : row.sgap_target_is)}
                      type="text"
                      placeholder=""
                      value={row.sgap_target || (row.sgap_target_is === false ? 0 : null)}
                      onChange={(e) => handleChangeDetail(row.sgap_code, 'sgap_target', e.target.value)}
                      className="right-align"
                    />
                    <div style={{
                      marginLeft: '5px',
                      marginRight: '5px',
                      color: 'red'
                    }}>{row.sgap_target_is_mdt === true ? '*' : <>&nbsp;&nbsp;</>}</div>
                  </div>
                  <div className='dCategoryECATE'>
                  </div>
                </div>
              ))}
              {(action === 'VIEW' ? null : <div className='dCenterCATE' style={{ paddingTop: '2%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'') }}>
                <button className="custom-buttonCATE" style={{ marginRight: '2%' }} onClick={OnSave}>
                  Save
                </button>
                <button className="custom-buttonResetCATE" onClick={OnReset}>
                  Reset
                </button>
              </div>)}

            </div>
          ) : (null)}




          <div className='dCenterCATE'>
            <div className="grid-containerCATE">
              <table className="grid-tableCATE">
                <thead>
                  <tr>
                    <th align='center' style={{ width: '120px' }}></th>
                    <th align='center' style={{ width: '80px' }}>Seq</th>
                    <th align='left' style={{ width: '300px' }}>Subject</th>
                    <th align='left' style={{ width: '300px' }}>Category Description</th>
                  </tr>
                </thead>
                {categoryMainlList.length > 0 ? (<tbody>
                  {categoryMainlList.map((row) => (
                    <tr>
                      <td align='center'>
                        <button className="icon-buttonEditCATE" style={{ marginRight: '5%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'') }} onClick={(e) => EditCategory('EDIT', row.sgap_no, row.sgap_seq, row.sgap_subject, row.sgap_type_code, row.type_desc)}>
                          <FontAwesomeIcon icon={faPenClip} />
                        </button>
                        <button className="icon-buttonDelCATE" style={{ marginRight: '5%', display: (localStorage.getItem('ReqAction') === 'APPROVE' ? 'none' :'') }} onClick={(e) => showConfirm('DEL', row.sgap_no, row.sgap_seq, row.sgap_subject, row.sgap_type_code, row.type_desc,'Do you want confirm delete subject?')}>
                          {/* onClick={(e) => EditCategory('DEL', row.sgap_no, row.sgap_seq, row.sgap_subject, row.sgap_type_code, row.type_desc)} */}
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="icon-buttonViewCATE" onClick={(e) => EditCategory('VIEW', row.sgap_no, row.sgap_seq, row.sgap_subject, row.sgap_type_code, row.type_desc)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td align='center'>{row.sgap_sort}</td>
                      <td align='left'>{row.sgap_subject}</td>
                      <td align='left'>{row.type_desc}</td>
                    </tr>
                  ))}
                </tbody>) : (null)}

              </table>
            </div>
          </div>

        </div>)}

        {(STC_Header.P_SGA_FLAG  && localStorage.getItem("ReqAction") === 'REGISTER' ? <div className='dCenterRES' style={{ paddingTop: '2%' }}>
            <button className="custom-buttonSendRES" onClick={(e) => showConfirm('SEND', '', '', '', '','','Do you want send to update result.')}>
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

    </div>
  )
}

export default Category