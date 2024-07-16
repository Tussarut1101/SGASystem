import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Page/Header';
import PageLoad from '../../Page/PageLoad';
import './ResultRPT.css';
import Select from 'react-select';
import styled from 'styled-components';
import { GetFactory, GetCostCenter, SearchData } from './ResultRPT_FN';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faRefresh, faPlus, faPenClip, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { RadioWrapper, HiddenRadio, StyledRadio, RadioLabel } from './StyledRadio';
import * as XLSX from 'xlsx';

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
  font-family: calibri Light;
  font-size: 16px;
  width: 300px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

function ResultRPT() {

    const location = useLocation();
    const [paramsGET, setparamsGET] = useState({ txtHeader: '', txtSubHeader: '', txtStatus: '', txtType: '', txtAction: '' });
    const { FactoryList, facList, } = GetFactory();
    const { CostCenterList, ccList } = GetCostCenter();
    const { loading,
        setloading,
        STC_SEARCH,
        handleChangeFac,
        handleChangeType,
        handleIssueDateFrm,
        handleIssueDateTo,
        handleStartDate,
        handleEndDate,
        handleInputChangeText,
        handleChangeCC,
        perTypeList,
        handleChangeRadito,
        period,
        colS,
        STC_MONTH,
        OnSearch,
        OnReload,
        dataList,
        nameReport } = SearchData();

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setloading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        FactoryList();
        CostCenterList();
    }, [location]);

    useEffect(() => {
        const strFactory = facList.find(facList => facList.value === localStorage.getItem("emp_fac_code"));
        handleChangeFac(strFactory);
    }, [facList]);

    const tableRef = useRef(null);

    const exportTableToExcel = () => {
        const dateR = new Date();
        const yearR = dateR.getFullYear();
        const monthR = String(dateR.getMonth() + 1).padStart(2, '0');
        const dayR = String(dateR.getDate()).padStart(2, '0');
        const hoursR = String(dateR.getHours()).padStart(2, '0');
        const minutesR = String(dateR.getMinutes()).padStart(2, '0');
        const secondsR = String(dateR.getSeconds()).padStart(2, '0');
        const Filename = nameReport + yearR + monthR + dayR + hoursR + minutesR + secondsR + '.xlsx';

        const table = tableRef.current;
        const workbook = XLSX.utils.table_to_book(table);
        // XLSX.writeFile(workbook, 'Result_Report.xlsx');
        XLSX.writeFile(workbook, Filename);
    };

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
                            <div className='dTitle'>SGA result report</div>
                            <div className='dSubTitle'>{STC_SEARCH.P_TYPE_REPORT === 'SUMMARY' ? 'Summary' :
                                                        STC_SEARCH.P_TYPE_REPORT === 'SUMMARY_CATEGORY' ? 'Summary Category' :
                                                        STC_SEARCH.P_TYPE_REPORT === 'MANAGER' ? 'Manager' : 'Member'}&nbsp;Report</div>
                            <div className='dContentJobMain'>
                                <div className='dContentJob'>
                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                <label style={{ color: 'red' }}>*</label>&nbsp;Factory :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledSelect className='react-select'
                                                    value={STC_SEARCH.P_FACTORY}
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
                                                <label style={{ color: 'red' }}>*</label>&nbsp;Year :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledTextBox
                                                    type="text"
                                                    placeholder=""
                                                    name='P_YEAR'
                                                    value={STC_SEARCH.P_YEAR}
                                                    onChange={handleInputChangeText}
                                                />
                                            </div>
                                        </div>
                                        <div className='dtdMid'>
                                            <div className='dtdFristE'>
                                                <label style={{ color: 'red' }}>*</label>&nbsp;Type :
                                            </div>
                                            <div className='dtdEndE'>
                                                <StyledSelect className='react-select'
                                                    value={STC_SEARCH.P_TYPE}
                                                    onChange={handleChangeType}
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
                                                SGA No. :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledTextBox
                                                    type="text"
                                                    placeholder=""
                                                    name='P_SGA_NO_FRM'
                                                    value={STC_SEARCH.P_SGA_NO_FRM}
                                                    onChange={handleInputChangeText}
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
                                                    name='P_SGA_NO_TO'
                                                    value={STC_SEARCH.P_SGA_NO_TO}
                                                    onChange={handleInputChangeText}
                                                />
                                            </div>
                                            <div className='dtdEndENone'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                Issue Date From :
                                            </div>
                                            <div className='dtdEnd'>
                                                <div className="datepicker-container">
                                                    <DatePicker
                                                        selected={STC_SEARCH.P_ISS_DATE_FRM}
                                                        onChange={handleIssueDateFrm}
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
                                                        selected={STC_SEARCH.P_ISS_DATE_TO}
                                                        onChange={handleIssueDateTo}
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

                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist'>
                                                <label style={{ color: 'red' }}>*</label>&nbsp;Start Date :
                                            </div>
                                            <div className='dtdEnd'>
                                                <div className="datepicker-container">
                                                    <DatePicker
                                                        selected={STC_SEARCH.P_START_DATE}
                                                        onChange={handleStartDate}
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
                                                <label style={{ color: 'red' }}>*</label>&nbsp;End Date :
                                            </div>
                                            <div className='dtdEndE'>
                                                <div className="datepicker-container">
                                                    <DatePicker
                                                        selected={STC_SEARCH.P_END_DATE}
                                                        onChange={handleEndDate}
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

                                    <div className='dflex'>
                                        <div className='dtdMid'>
                                            <div className='dtdFrist' style={{alignItems: 'flex-start'}}>
                                                Cost Center :
                                            </div>
                                            <div className='dtdEnd'>
                                                <StyledSelect className='react-select'
                                                    value={STC_SEARCH.P_CC}
                                                    onChange={handleChangeCC}
                                                    options={ccList}
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
                                                <div style={{ display: 'block' }}>
                                                    <div style={{ display: 'flex', fontFamily: 'calibri Light', marginBottom: '0.5rem' }}>
                                                        <RadioWrapper>
                                                            <HiddenRadio
                                                                id="SUMMARY"
                                                                name="options"
                                                                value="SUMMARY"
                                                                checked={STC_SEARCH.P_TYPE_REPORT === 'SUMMARY'}
                                                                onChange={handleChangeRadito}
                                                            />
                                                            <StyledRadio checked={STC_SEARCH.P_TYPE_REPORT === 'SUMMARY'} />
                                                            <RadioLabel htmlFor="SUMMARY">Summary Cost Saving</RadioLabel>
                                                        </RadioWrapper>
                                                    </div>
                                                    <div style={{ display: 'flex', fontFamily: 'calibri Light', marginBottom: '0.5rem' }}>
                                                        <RadioWrapper>
                                                            <HiddenRadio
                                                                id="SUMMARY_CATEGORY"
                                                                name="options"
                                                                value="SUMMARY_CATEGORY"
                                                                checked={STC_SEARCH.P_TYPE_REPORT === 'SUMMARY_CATEGORY'}
                                                                onChange={handleChangeRadito}
                                                            />
                                                            <StyledRadio checked={STC_SEARCH.P_TYPE_REPORT === 'SUMMARY_CATEGORY'} />
                                                            <RadioLabel htmlFor="SUMMARY_CATEGORY">Summary Category</RadioLabel>
                                                        </RadioWrapper>

                                                    </div>
                                                    <div style={{ display: 'flex', fontFamily: 'calibri Light' }}>
                                                        <RadioWrapper>
                                                            <HiddenRadio
                                                                id="MANAGER"
                                                                name="options"
                                                                value="MANAGER"
                                                                checked={STC_SEARCH.P_TYPE_REPORT === 'MANAGER'}
                                                                onChange={handleChangeRadito}
                                                            />
                                                            <StyledRadio checked={STC_SEARCH.P_TYPE_REPORT === 'MANAGER'} />
                                                            <RadioLabel htmlFor="MANAGER">Manager</RadioLabel>
                                                        </RadioWrapper>
                                                        <RadioWrapper>
                                                            <HiddenRadio
                                                                id="MEMBER"
                                                                name="options"
                                                                value="MEMBER"
                                                                checked={STC_SEARCH.P_TYPE_REPORT === 'MEMBER'}
                                                                onChange={handleChangeRadito}
                                                            />
                                                            <StyledRadio checked={STC_SEARCH.P_TYPE_REPORT === 'MEMBER'} />
                                                            <RadioLabel htmlFor="MEMBER">Member</RadioLabel>
                                                        </RadioWrapper>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='dtdEndENone'>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='dCenter' style={{ marginTop: '2%', marginBottom: '2%' }}>
                                        <button className="icon-buttonSearch">
                                            <FontAwesomeIcon icon={faSearch} onClick={OnSearch} />
                                        </button>
                                        <button className="icon-buttonRe">
                                            <FontAwesomeIcon icon={faRefresh} onClick={OnReload} />
                                        </button>
                                        {dataList.length > 0 ? (<button className="icon-buttonExport" onClick={exportTableToExcel}>
                                            <FontAwesomeIcon icon={faDownload} /> Export Excel
                                        </button>) : (null)}
                                    </div>
                                    {dataList.length > 0 ? (
                                        <div className='dCenter'>
                                            <div className="grid-containerMainRes">
                                                <table ref={tableRef} className="grid-tableMainRes" id="tableExport">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>Factory</th>
                                                            <th style={{ width: '150px' }} rowspan='2' align='center'>SGA No.</th>
                                                            <th style={{ width: '120px' }} rowspan='2' align='center'>Issue Date</th>
                                                            <th style={{ width: '160px' }} rowspan='2' align='left'>Type</th>
                                                            <th style={{ width: '200px' }} rowspan='2' align='left'>Team</th>
                                                            <th style={{ width: '200px' }} rowspan='2' align='left'>Theme</th>
                                                            {/* Category มี if type <> 'SUMMARY' and 'SUMMARY_CATEGORY'*/}
                                                            {STC_SEARCH.P_TYPE_REPORT === 'MANAGER' || STC_SEARCH.P_TYPE_REPORT === 'MEMBER'  ? <th style={{ width: '300px' }} rowspan='2' align='left'>Category</th> : null}


                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>CC</th>
                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>Total MGR.</th>

                                                            {/* Category มี if type <> 'MANAGER'*/}
                                                            {STC_SEARCH.P_TYPE_REPORT !== 'MANAGER' ? <th style={{ width: '150px' }} rowspan='2' align='left'>Manager</th> : null}


                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>Period</th>
                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>Member</th>
                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>Start Date</th>
                                                            <th style={{ width: '100px' }} rowspan='2' align='center'>End Date</th>
                                                            <th style={{ width: '150px' }} rowspan='2' align='center'>Total Plan</th>
                                                            <th style={{ width: '150px' }} rowspan='2' align='center'>Total actual</th>
                                                            <th style={{ width: '250px' }} rowspan='2' align='left'>Status</th>

                                                            {/* Category มี if type <> 'SUMMARY'*/}
                                                            {STC_SEARCH.P_TYPE_REPORT !== 'SUMMARY' ? <th style={{ width: '250px' }} rowspan='2' align='left'>{STC_SEARCH.P_TYPE_REPORT === 'MANAGER' ? 'Manager' : STC_SEARCH.P_TYPE_REPORT === 'MEMBER' ? 'Member': 'Category Subject'}</th> : null}


                                                            {period >= 1 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_01}</th> : null}
                                                            {period >= 2 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_02}</th> : null}
                                                            {period >= 3 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_03}</th> : null}
                                                            {period >= 4 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_04}</th> : null}
                                                            {period >= 5 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_05}</th> : null}
                                                            {period >= 6 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_06}</th> : null}
                                                            {period >= 7 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_07}</th> : null}
                                                            {period >= 8 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_08}</th> : null}
                                                            {period >= 9 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_09}</th> : null}
                                                            {period >= 10 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_10}</th> : null}
                                                            {period >= 11 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_11}</th> : null}
                                                            {period >= 12 ? <th style={{ width: '300px' }} align='center' colSpan={colS}>{STC_MONTH.M_12}</th> : null}
                                                        </tr>
                                                        <tr>
                                                            {period >= 1 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 2 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 3 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 4 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 5 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 6 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 7 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 8 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 9 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 10 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 11 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}
                                                            {period >= 12 ? <>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Plan</th>
                                                                <th style={{ width: '100px', fontSize: '14px' }} align='center'>Actual</th>
                                                                {colS === 3 ? <th style={{ width: '100px', fontSize: '14px' }} align='center'>% Achieve</th> : null}</> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataList.map((row) => (
                                                            <tr>
                                                                <td align='center'>{row.fac_desc}</td>
                                                                <td align='center'>{row.sga_no}</td>
                                                                <td align='center'>{row.issue_date}</td>
                                                                <td align='left'>{row.sga_type}</td>
                                                                <td align='left'>{row.sga_team}</td>
                                                                <td align='left'>{row.sga_theme}</td>
                                                                {/* Category มี if type <> 'SUMMARY'*/}
                                                                {STC_SEARCH.P_TYPE_REPORT === 'MANAGER' || STC_SEARCH.P_TYPE_REPORT === 'MEMBER' ? <td align='left'>{row.sga_category}</td> : null}


                                                                <td align='center'>{row.sga_cc}</td>
                                                                <td align='center'>{row.total_manager}</td>

                                                                {/* Category มี if type <> 'MANAGER'*/}
                                                                {STC_SEARCH.P_TYPE_REPORT !== 'MANAGER' ? <td align='left'>{row.sga_manager}</td> : null}


                                                                <td align='center'>{row.sga_period}</td>
                                                                <td align='center'>{row.total_member}</td>
                                                                <td align='center'>{row.start_date}</td>
                                                                <td align='center'>{row.end_date}</td>
                                                                <td align='right'>{row.total_target}</td>
                                                                <td align='right'>{row.total_actual}</td>
                                                                <td align='left'>{row.sga_status}</td>

                                                                {/* Category มี if type <> 'SUMMARY'*/}
                                                                {/* {STC_SEARCH.P_TYPE_REPORT !== 'SUMMARY' ? <td align='left'>{STC_SEARCH.P_TYPE === 'SUMMARY_CATEGORY' ? 'ss' : row.emp_name}</td> : null} */}
                                                                {STC_SEARCH.P_TYPE_REPORT !== 'SUMMARY' ? <td align='left'>{STC_SEARCH.P_TYPE_REPORT === 'MANAGER' ? row.emp_name : STC_SEARCH.P_TYPE_REPORT === 'MEMBER' ? row.emp_name : row.sga_cate_desc}</td> : null}

                                                                {period >= 1 ? <>
                                                                    <td align='right'>{row.m_01_1}</td>
                                                                    <td align='right'>{row.m_01_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_01_3}</td> : null}</> : null}
                                                                {period >= 2 ? <>
                                                                    <td align='right'>{row.m_02_1}</td>
                                                                    <td align='right'>{row.m_02_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_02_3}</td> : null}</> : null}
                                                                {period >= 3 ? <>
                                                                    <td align='right'>{row.m_03_1}</td>
                                                                    <td align='right'>{row.m_03_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_03_3}</td> : null}</> : null}
                                                                {period >= 4 ? <>
                                                                    <td align='right'>{row.m_04_1}</td>
                                                                    <td align='right'>{row.m_04_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_04_3}</td> : null}</> : null}
                                                                {period >= 5 ? <>
                                                                    <td align='right'>{row.m_05_1}</td>
                                                                    <td align='right'>{row.m_05_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_05_3}</td> : null}</> : null}
                                                                {period >= 6 ? <>
                                                                    <td align='right'>{row.m_06_1}</td>
                                                                    <td align='right'>{row.m_06_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_06_3}</td> : null}</> : null}
                                                                {period >= 7 ? <>
                                                                    <td align='right'>{row.m_07_1}</td>
                                                                    <td align='right'>{row.m_07_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_07_3}</td> : null}</> : null}
                                                                {period >= 8 ? <>
                                                                    <td align='right'>{row.m_08_1}</td>
                                                                    <td align='right'>{row.m_08_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_08_3}</td> : null}</> : null}
                                                                {period >= 9 ? <>
                                                                    <td align='right'>{row.m_09_1}</td>
                                                                    <td align='right'>{row.m_09_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_09_3}</td> : null}</> : null}
                                                                {period >= 10 ? <>
                                                                    <td align='right'>{row.m_10_1}</td>
                                                                    <td align='right'>{row.m_10_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_10_3}</td> : null}</> : null}
                                                                {period >= 11 ? <>
                                                                    <td align='right'>{row.m_11_1}</td>
                                                                    <td align='right'>{row.m_11_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_11_3}</td> : null}</> : null}
                                                                {period >= 12 ? <>
                                                                    <td align='right'>{row.m_12_1}</td>
                                                                    <td align='right'>{row.m_12_2}</td>
                                                                    {colS === 3 ? <td align='right'>{row.m_12_3}</td> : null}</> : null}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (<div className='dCenter'><h2>No data dound</h2></div>)}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}


        </div>
    )
}

export default ResultRPT