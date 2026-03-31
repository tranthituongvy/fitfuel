import { useState, useEffect } from "react";


const Modal = ({ isOpen, onClose, onConfirm }) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if(isOpen) setClosing(false);
    }, [isOpen]);

    if(!isOpen && !closing) return;

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 200);
    }

    return (
        <div className={`modal-overlay ${closing ? "closing": ""}`}>
            <div className={`modal ${closing ? "closing": ""}`}>
                <p>Are you sure?</p>
                <button onClick={onConfirm}>Delete</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>    
    );
};

export default Modal;