import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './CategoryM.css';
import Select from 'react-select';
import styled from 'styled-components';
import { CategoryM_Fn, GetCategory } from './CategoryM_Fn';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faRefresh, faPlus, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import PopupConfirm from '../../Common/Popconfirm';
import Modal from 'react-modal';
import { RadioWrapper, HiddenRadio, StyledRadio, RadioLabel } from './StyledRadio';

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

const StyledTextBoxSort = styled.input`
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

 &.right-align {
    text-align: right;
  }
`;

function CategoryM() {
    const location = useLocation();
    const { categoryList,
        CategoryList } = GetCategory();
    const { loading,
        setloading,
        statusList,
        selectCategory,
        handleChangeCategory,
        selectStatus,
        handleChangeStatus,
        genDetailTable,
        GetData,
        OnReload,
        STC_HEAD,
        STC_SUB,
        detailList,
        GetDataForm,
        actionForm,
        isOpenPopup,
        setisOpenPopup,
        handleInputChangeTextHead,
        handleChangeStatusHeadForm,
        isDetail,
        setisDetail,
        GetDataFormDetail,
        handleInputChangeTextSub,
        handleChangeStatusSub,
        handleChangeBefore,
        handleChange1Q,
        handleChange2Q,
        handleChangeTarget,
        flagList,
        handleChangeRadito,
        GetDataFormSubDetail,
        OnResetDetail,
        OnBack,
        OnSaveHeader,
        OnResetHeader,
        isNewCode,
        OnSaveDetail,
        OnDelMain,
        OnDelDetail } = CategoryM_Fn();


    useEffect(() => {
        setloading(true);
        setTimeout(() => {
            CategoryList()
            setloading(false)
        }, 1000);
    }, [location]);

    const closeModal = () => {
        setisOpenPopup(false);
    };


    const [selected, setSelected] = useState('option1');

    const handleChange = (e) => {
        setSelected(e.target.value);
    };


    const [p_type, setp_type] = useState();
    const [visible, setVisible] = useState(false);
    const [strMessage, setstrMessage] = useState('');

    const showConfirm = (type, Message) => {
        setp_type(type);
        setstrMessage(Message);
        setVisible(true);
    };

    const handleConfirm = () => {
        OnDelMain(p_type)
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
                            <div className='dTitle'>SGA Category Master</div>
                            <div className='dSubTitle'>Category Maintain </div>
                            <div className='dContentJobMain'>
                                <div className='dContentJob'>
                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                Category :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledSelect className='react-select'
                                                    value={selectCategory}
                                                    onChange={handleChangeCategory}
                                                    options={categoryList}
                                                    placeholder="Select an option"
                                                    classNamePrefix="react-select"
                                                    isDisabled={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='dtdMid'>
                                            <div className='dtdFristE'>
                                                Status :
                                            </div>
                                            <div className='dtdEndE'>
                                                <StyledSelect className='react-select'
                                                    value={selectStatus}
                                                    onChange={handleChangeStatus}
                                                    options={statusList}
                                                    placeholder="Select an option"
                                                    classNamePrefix="react-select"
                                                    isDisabled={false}
                                                />
                                            </div>
                                            <div className='dtdEndENone'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dblank'></div>
                                    <div className='dCenter'>
                                        <button className="icon-buttonADDMain">
                                            <FontAwesomeIcon icon={faPlus} onClick={(e) => GetDataForm('NEW', '')} />
                                        </button>
                                        <button className="icon-buttonSearch" onClick={GetData}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                        <button className="icon-buttonRe" onClick={OnReload}>
                                            <FontAwesomeIcon icon={faRefresh} />
                                        </button>

                                    </div>
                                    <div className='dblank'></div>
                                    {genDetailTable.length > 0 ? (
                                        <div className='dCenter'>
                                            <div className="grid-containerMain">
                                                <table className="grid-tableMainCate">
                                                    <thead>
                                                        <tr>
                                                            <th align='center' style={{ width: '100px' }}></th>
                                                            <th align='left' style={{ width: '400px' }}>Category</th>
                                                            <th align='left' style={{ width: '150px' }}>Status</th>
                                                            <th align='center' style={{ width: '150px' }}>Modify by</th>
                                                            <th align='center' style={{ width: '150px' }}>Modify Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {genDetailTable.map((row) => (
                                                            <tr>
                                                                <td align='center'>
                                                                    <button className="icon-buttonEdit" onClick={(e) => GetDataForm('EDIT', row.type_code)} >
                                                                        <FontAwesomeIcon icon={faPenClip} />
                                                                    </button>
                                                                    <button className="icon-buttonDel" onClick={(e) => showConfirm( row.type_code, 'Do you want confirm delete subject?')}>
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </button></td>
                                                                <td align='left'>{row.type_code}&nbsp;:&nbsp;{row.type_desc}</td>
                                                                <td align='left'>{row.type_status}</td>
                                                                <td align='center'>{row.type_modify_by}</td>
                                                                <td align='center'>{row.type_modify_date}</td>
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
                        <div className='dtdMidFC'>
                            <div className='dtdFristC'>
                                <label style={{ color: 'red' }}>*</label> &nbsp;Category :
                            </div>
                            <div className='dtdEndC'>
                                <StyledTextBox
                                    disabled={true}
                                    type="text"
                                    placeholder=""
                                    name='TYPE_CODE'
                                    value={STC_HEAD.TYPE_CODE || ''}
                                    onChange={handleInputChangeTextHead}
                                />
                            </div>
                        </div>
                        <div className='dtdMidEC'>
                            <div className='dtdFristEC'>
                                <label style={{ color: 'red' }}>*</label> &nbsp;Description :
                            </div>
                            <div className='dtdEndEC'>
                                <StyledTextBox
                                    disabled={isDetail}
                                    type="text"
                                    placeholder=""
                                    name='TYPE_DESC'
                                    value={STC_HEAD.TYPE_DESC || ''}
                                    onChange={handleInputChangeTextHead}
                                />
                            </div>
                            <div className='dtdEndENoneC'>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: (isDetail ? 'none' : '') }}>
                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    Status :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledSelect className='react-select'
                                        value={STC_HEAD.TYPE_STATUS}
                                        onChange={handleChangeStatusHeadForm}
                                        options={statusList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                </div>
                                <div className='dtdEndEC'>

                                </div>
                                <div className='dtdEndENoneC'>
                                </div>
                            </div>
                        </div>

                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    Modify By :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledTextBox
                                        disabled={true}
                                        type="text"
                                        placeholder=""
                                        name='TYPE_MODIFY_BY'
                                        value={STC_HEAD.TYPE_MODIFY_BY || ''}
                                        onChange={handleInputChangeTextHead}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                    Modify Date :
                                </div>
                                <div className='dtdEndEC'>
                                    <StyledTextBox
                                        disabled={true}
                                        type="text"
                                        placeholder=""
                                        name='TYPE_MODIFY_DATE'
                                        value={STC_HEAD.TYPE_MODIFY_DATE || ''}
                                        onChange={handleInputChangeTextHead}
                                    />
                                </div>
                                <div className='dtdEndENoneC'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dCenter' style={{ paddingTop: '1%', display: (isDetail ? 'none' : '') }}>
                        <button className="custom-buttonPop" style={{ marginRight: '2%' }} onClick={OnSaveHeader}>
                            Save
                        </button>
                        <button className="custom-buttonResetPop" style={{ marginRight: '2%' }} onClick={OnResetHeader}>
                            Reset
                        </button>
                        <button className="custom-buttonDetailPop" style={{ display: (actionForm === 'NEW' ? 'none' : '') }} onClick={(e) => GetDataFormDetail(STC_HEAD.TYPE_CODE)}>
                            Detail
                        </button>
                    </div>
                    <div style={{ display: (isDetail ? '' : 'none') }}>
                        <div className='dCenter'><div className='dblankLine'></div></div>
                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;Item :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledTextBox
                                        disabled={isNewCode}
                                        type="text"
                                        placeholder="ตัวอักษรพิมพ์ใหญ่ 2 ตัว ตัวเลข 3 ตัว"
                                        name='TYPED_CODE'
                                        value={STC_SUB.TYPED_CODE || ''}
                                        onChange={handleInputChangeTextSub}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;Item Desc :
                                </div>
                                <div className='dtdEndEC'>
                                    <StyledTextBox
                                        type="text"
                                        placeholder=""
                                        name='TYPED_DESC'
                                        value={STC_SUB.TYPED_DESC || ''}
                                        onChange={handleInputChangeTextSub}
                                    />
                                </div>
                                <div className='dtdEndENoneC'>
                                </div>
                            </div>
                        </div>

                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;Before :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledSelect className='react-select'
                                        value={STC_SUB.TYPED_BEFORE}
                                        onChange={handleChangeBefore}
                                        options={flagList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;1 Quater Target  :
                                </div>
                                <div className='dtdEndEC'>
                                    <StyledSelect className='react-select'
                                        value={STC_SUB.TYPED_1QTARGET}
                                        onChange={handleChange1Q}
                                        options={flagList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                                <div className='dtdEndENoneC'>
                                </div>
                            </div>
                        </div>

                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;2 Quater Target :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledSelect className='react-select'
                                        value={STC_SUB.TYPED_2QTARGET}
                                        onChange={handleChange1Q}
                                        options={flagList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                    <label style={{ color: 'red' }}>*</label> &nbsp;Target :
                                </div>
                                <div className='dtdEndEC'>
                                    <StyledSelect className='react-select'
                                        value={STC_SUB.TYPED_TARGET}
                                        onChange={handleChangeTarget}
                                        options={flagList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                                <div className='dtdEndENoneC'>
                                </div>
                            </div>
                        </div>

                        <div className='dflex'>
                            <div className='dtdMidFC'>
                                <div className='dtdFristC'>
                                    Status :
                                </div>
                                <div className='dtdEndC'>
                                    <StyledSelect className='react-select'
                                        value={STC_SUB.TYPED_STATUS}
                                        onChange={handleChangeStatusSub}
                                        options={statusList}
                                        placeholder="Select an option"
                                        classNamePrefix="react-select"
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div className='dtdMidEC'>
                                <div className='dtdFristEC'>
                                    Sort :
                                </div>
                                <div className='dtdEndEC' style={{width: '70%'}}>
                                    <StyledTextBoxSort
                                        type="text"
                                        placeholder=""
                                        name='TYPED_SORT'
                                        value={STC_SUB.TYPED_SORT || ''}
                                        onChange={handleInputChangeTextSub}
                                        className="right-align"
                                    />&nbsp;&nbsp;&nbsp;&nbsp;
                                    Flag : &nbsp;&nbsp;<div style={{ display: 'flex', fontFamily: 'calibri Light', fontSize: '12px' }}>
                                        <RadioWrapper>
                                            <HiddenRadio
                                                id="Y"
                                                name="options"
                                                value="Y"
                                                checked={STC_SUB.TYPED_FLAG_COST_SAVE === 'Y'}
                                                onChange={handleChangeRadito}
                                            />
                                            <StyledRadio checked={STC_SUB.TYPED_FLAG_COST_SAVE === 'Y'} />
                                            <RadioLabel htmlFor="Y">Cost saving</RadioLabel>
                                        </RadioWrapper>
                                        <RadioWrapper>
                                            <HiddenRadio
                                                id="O"
                                                name="options"
                                                value="O"
                                                checked={STC_SUB.TYPED_FLAG_COST_SAVE === 'O'}
                                                onChange={handleChangeRadito}
                                            />
                                            <StyledRadio checked={STC_SUB.TYPED_FLAG_COST_SAVE === 'O'} />
                                            <RadioLabel htmlFor="O">Need Input</RadioLabel>
                                        </RadioWrapper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dCenter' style={{ paddingTop: '1%', display: (isDetail ? '' : 'none') }}>
                            <button className="custom-buttonPop" style={{ marginRight: '2%' }} onClick={OnSaveDetail}>
                                Save
                            </button>
                            <button className="custom-buttonResetPop" style={{ marginRight: '2%' }} onClick={OnResetDetail}>
                                Reset
                            </button>
                            <button className="custom-buttonDetailPop" onClick={OnBack}>
                                Back
                            </button>
                        </div>
                        {detailList.length > 0 ? (
                            <div className='dCenter' style={{ margin: '1%' }}>
                                <div className="grid-containerMainDetail">
                                    <table className="grid-tableMainCateDetail">
                                        <thead>
                                            <tr>
                                                <th align='center' style={{ width: '100px' }}></th>
                                                <th align='left' style={{ width: '300px' }}>Item</th>
                                                <th align='center' style={{ width: '100px' }}>Before</th>
                                                <th align='center' style={{ width: '100px' }}>1 Quater</th>
                                                <th align='center' style={{ width: '100px' }}>2 Quater</th>
                                                <th align='center' style={{ width: '100px' }}>Target</th>
                                                <th align='center' style={{ width: '100px' }}>Status</th>
                                                <th align='center' style={{ width: '100px' }}>Sort</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detailList.map((row) => (
                                                <tr style={{ backgroundColor: (STC_SUB.TYPED_CODE === row.typed_code ? 'yellow' : '#ffcbe8a6') }}>
                                                    <td align='center'>
                                                        <button className="icon-buttonEdit" onClick={(e) => GetDataFormSubDetail(row.typed_type_code, row.typed_code)}>
                                                            <FontAwesomeIcon icon={faPenClip} />
                                                        </button>
                                                        <button className="icon-buttonDel">
                                                            <FontAwesomeIcon icon={faTrash} onClick={(e) => OnDelDetail(row.typed_type_code, row.typed_code)} />
                                                        </button></td>
                                                    <td align='left'>{row.typed_code}&nbsp;:&nbsp;{row.typed_desc}</td>
                                                    <td align='center'>{row.typed_before}</td>
                                                    <td align='center'>{row.typed_1qtarget}</td>
                                                    <td align='center'>{row.typed_2qtarget}</td>
                                                    <td align='center'>{row.typed_target}</td>
                                                    <td align='center'>{row.typed_status}</td>
                                                    <td align='center'>{row.typed_sort}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) :
                            (<div className='dCenter' ><h2>No data dound</h2></div>)}

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

export default CategoryM