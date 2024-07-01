import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './TransactionMain.css';
import Select from 'react-select';
import styled from 'styled-components';
import { GetFactory, SearchData } from './Transaction_Fn';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faRefresh, faPlus, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';


const StyledSelect = styled(Select)`
  width: 90% !important;
  .react-select__control {
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    font-family: calibri Light;
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
  font-size: 16px;
  width: 300px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

function TransactionMain() {

    const location = useLocation();
    const [paramsGET, setparamsGET] = useState({ txtHeader: '', txtSubHeader: '', txtStatus: '', txtType: '', txtAction: '' });
    const { FactoryList, facList, } = GetFactory();
    const { handleChangeFac,
        selectedOptionFac,
        setSelectedOptionFac,
        handleDateChangeSGADateFrm,
        selectedSGADateFrm,
        handleDateChangeSGADateTo,
        selectedSGADateTo,
        GetData,
        strSGANoFrm,
        settxtsganoFrm,
        strSGANoTo,
        settxtsganoTo,
        genHeaderTable,
        genDetailTable,
        loading,
        setloading,
        ResetValues,
        NewPage } = SearchData();

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setloading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const txtHeader = params.get('txtHeader') || '';
        const txtSubHeader = params.get('txtSubHeader') || '';
        const txtStatus = params.get('txtStatus') || '';
        const txtType = params.get('txtType') || '';
        const txtAction = params.get('txtAction') || '';
        setparamsGET({ txtHeader, txtSubHeader, txtStatus, txtType, txtAction });
        localStorage.setItem("TitleHeader", txtHeader)
        localStorage.setItem("TitleSubHeader", txtSubHeader)
        localStorage.setItem("StatusCode", txtStatus)
        localStorage.setItem("ReqType", txtType)
        localStorage.setItem("ReqAction", txtAction)
        FactoryList();
        GetData();
    }, [location]);

    // useEffect(() => {
    //     const strFactory = facList.find(facList => facList.value === localStorage.getItem("emp_fac_code"));
    //     setSelectedOptionFac(strFactory);
    // }, [facList]);

    useEffect(() => {
        const autoPostback = async () => {
            settxtsganoTo(strSGANoFrm)
        };
        autoPostback();
    }, [strSGANoFrm]);


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
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                Factory :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledSelect className='react-select'
                                                    value={selectedOptionFac}
                                                    onChange={handleChangeFac}
                                                    options={facList}
                                                    placeholder="Select an option"
                                                    classNamePrefix="react-select"
                                                    isDisabled={false}
                                                />
                                            </div>
                                        </div>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                            </div>
                                            <div className='dtdEnd'>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                SGA No. :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledTextBox
                                                    type="text"
                                                    placeholder=""
                                                    value={strSGANoFrm}
                                                    onChange={(e) => settxtsganoFrm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='dtdMid'>
                                            <div className='dtdFristE'>
                                                To :
                                            </div>
                                            <div className='dtdEndE'>
                                                <StyledTextBox
                                                    type="text"
                                                    placeholder=""
                                                    value={strSGANoTo}
                                                    onChange={(e) => settxtsganoTo(e.target.value)}
                                                />
                                            </div>
                                            <div className='dtdEndENone'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                Register Date :
                                            </div>
                                            <div className='dtdEnd'>
                                                <div className="datepicker-container">
                                                    <DatePicker
                                                        selected={selectedSGADateFrm}
                                                        onChange={handleDateChangeSGADateFrm}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="dd/MM/yyyy"
                                                        className="custom-datepicker"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="datepicker-icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='dtdMid'>
                                            <div className='dtdFristE'>
                                                To :
                                            </div>
                                            <div className='dtdEndE'>
                                                <div className="datepicker-container">
                                                    <DatePicker
                                                        selected={selectedSGADateTo}
                                                        onChange={handleDateChangeSGADateTo}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="dd/MM/yyyy"
                                                        className="custom-datepicker"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="datepicker-icon" />
                                                </div>
                                            </div>
                                            <div className='dtdEndENone'>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='dCenter'>
                                        {paramsGET.txtType === 'TRANSACTION' && paramsGET.txtAction === 'REGISTER' ? (
                                            <button className="icon-buttonADDMain" onClick={(e) => NewPage('ADD','','Create')}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        ) : (null)}
                                        <button className="icon-buttonSearch" onClick={GetData}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                        <button className="icon-buttonRe" onClick={ResetValues}>
                                            <FontAwesomeIcon icon={faRefresh} />
                                        </button>

                                    </div>
                                    <div className='dblank'></div>
                                    {genDetailTable.length > 0 ? (
                                        <div className='dCenter'>
                                            <div className="grid-containerMain">
                                                <table className="grid-tableMain">
                                                    <thead>
                                                        <tr>
                                                            {genHeaderTable.map((rowC) => (
                                                                <th align={rowC.position} style={{ width: rowC.width }}>{rowC.headerName}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {genDetailTable.map((row) => (
                                                            <tr key={row.id}>
                                                                {genHeaderTable.map((rowN) => (
                                                                    <React.Fragment key={rowN.field}>
                                                                        {rowN.field === 'action' ? (
                                                                            <td align={rowN.position}>
                                                                                <button className="icon-buttonEdit" onClick={(e) => NewPage('EDIT',row.sgah_no,row.sgah_status_desc)}>
                                                                                    <FontAwesomeIcon icon={faPenClip} />
                                                                                </button>
                                                                                <button className="icon-buttonDel" onClick={(e) => NewPage('DEL',row.sgah_no,'Create')}>
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </button>
                                                                            </td>
                                                                        ) : (
                                                                            <td align={rowN.position}>{row[rowN.field]}</td>
                                                                        )}
                                                                    </React.Fragment>

                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='dCenter'><h2>No data dound</h2></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}


        </div>)
}

export default TransactionMain