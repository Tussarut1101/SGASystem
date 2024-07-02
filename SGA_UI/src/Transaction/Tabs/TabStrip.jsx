import React, { useState, useEffect } from 'react';
import Tab from './Tab'; // import Tab จากไฟล์ Tab.js
import Register from '../Register/Register';
import Category from '../Category/Category';
import Advisor from '../Advisor/Advisor';
import Member from '../Member/Member';
import Result from '../Result/Result';
import './TabStrip.css';

const TabStrip = ({ tabs, initialTab, onAction }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleTabClick = (index) => {
        initialTab = index;
        if ((localStorage.getItem('SGAno') === null || localStorage.getItem('SGAno') === '' || localStorage.getItem('SGAno') === ' ') && index != 0) {
            alert('Please Before Register SGA...')
            setActiveTab(0)
        }
        else {
            setActiveTab(index);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <Register onAction={onAction} />;
            case 1:
                return <Category onAction={onAction} />;
            case 2:
                return <Advisor onAction={onAction} />;
            case 3:
                return <Member onAction={onAction} />;
            case 4:
                return <Result onAction={onAction} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="tab-strip">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        isActive={index === activeTab}
                        onClick={() => handleTabClick(index)}
                        tabIndex={index} // ส่ง prop tabIndex มา
                    />
                ))}
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabStrip;