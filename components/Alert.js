import { useEffect, useRef } from 'react';

import { MdVerified } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

const Alert = ({ message, type, setAlert }) => {
    const boxRef = useRef();

    useEffect(() => {
        const addRemoveClass = () => boxRef?.current?.classList?.toggle("active");
        const removeAlert = () => setAlert(false);

        setTimeout(addRemoveClass, 100);
        setTimeout(addRemoveClass, 2300);
        setTimeout(removeAlert, 2500);

        return () => {
            clearTimeout(removeAlert);
            clearTimeout(addRemoveClass);
        }
    }, [])

    return (
        <div className={`${"alertBox " + type}`} ref={boxRef}>
            <div className="alert">
                {type === "blue" ? <MdVerified /> : (type === "red" ? <IoIosAlert /> : <IoIosWarning />)}
                <span>{message}</span>
            </div>
            <div className='bottomLine'>
                <span className='line'></span>
            </div>
        </div >
    )
}

export default Alert;