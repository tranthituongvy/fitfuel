import { useState, useEffect } from "react";

const Toast = ({message, onClose}) => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true);
            setTimeout(onClose, 300);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);
   

    return (
        <div className={`toast ${hide ? "hide" : ""}`}>
            {message}
        </div>
    );
}

export default Toast;