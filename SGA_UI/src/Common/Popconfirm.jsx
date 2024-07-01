import React from 'react';
import './Popconfirm.css'; // Import CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Popconfirm = ({ visible, onConfirm, onCancel, message }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="popup-confirm-overlay">
            <div className="popup-confirm">
                <div className="popup-confirm-header">
                <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: '64px', color: 'blue' }} />
                </div>
                <div className="popup-confirm-body">
                    Confirmation
                </div>
                <div className="popup-confirm-body">
                    <div className="popup-confirm-message">
                        {message}
                    </div>
                </div>

                <div className="popup-confirm-footer">
                    <button className="popup-confirm-button confirm" onClick={onConfirm}>
                        Yes
                    </button>

                    <button className="popup-confirm-button" onClick={onCancel}>
                        No
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Popconfirm;