import React from 'react';
import { Modal, Button } from 'antd';

const Popupconfrim = ({ visible, Message, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Confirm"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
        >
            <p>{Message}</p>
        </Modal>

    )
}

export default Popupconfrim