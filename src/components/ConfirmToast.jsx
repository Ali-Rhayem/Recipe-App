import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css'; 

const ConfirmToast = ({ onConfirm, onCancel }) => (
    <div className="confirm-toast">
        <p>Are you sure you want to delete this recipe?</p>
        <div className="buttons">
            <button onClick={() => { onConfirm(); toast.dismiss(); }}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    </div>
);

export const showConfirmToast = (onConfirm, onCancel) => {
    toast(<ConfirmToast onConfirm={onConfirm} onCancel={onCancel} />, {
        position: "top-center", 
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
    });
};

export default ConfirmToast;
