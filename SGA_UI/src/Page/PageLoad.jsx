import React, { useState, useEffect } from 'react';
import './PageLoad.css';
import 'react-datepicker/dist/react-datepicker.css';


function PageLoad() {
    return (
        <div className="App"><div className="loader-container">
            <div className="loader"></div>
            <h1>Loading...</h1>
        </div></div>
    )
}

export default PageLoad