import React from 'react';

const Tab = ({ label, isActive, onClick, tabIndex }) => {
    return (
      <div className={isActive ? `tab active tab-${tabIndex}` : `tab tab-${tabIndex}`} onClick={onClick}>
        {label}
      </div>
    );
  };

export default Tab;