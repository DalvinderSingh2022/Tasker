import { useEffect, useRef } from 'react';

import { MdVerified } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

const Alert = ({ message, type, setAlert }) => {
    const boxRef = useRef();

    useEffect(() => {
        const timeout = () => setAlert(false);
        setTimeout(timeout, 2500);

        return () => clearTimeout(timeout)
    })

    return (
        <div className={`${"alertBox " + type}`}>
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