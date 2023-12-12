import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import Link from "next/link";

import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { MdOutlineMenuOpen } from "react-icons/md";

import { authContext } from "@/store/auth";

import cssClasses from "../styles/Navbar.module.css";
import Alert from "./Alert";

const Navbar = () => {
    const router = useRouter();
    const navRef = useRef(null);
    const [alert, setAlert] = useState(null);
    const { authState, authDispatch } = useContext(authContext);

    if (!authState?.isAuthenticated)
        return <></>;

    return (
        <>
            <nav className={cssClasses.navbar} ref={navRef}>
                <button className="round menu" onClick={() => navRef.current.classList.toggle("open")}><MdOutlineMenuOpen /></button>
                <div>
                    <div className={cssClasses.logo}>Todo App</div>
                    <Link onClick={() => navRef.current.classList.toggle("open")} href='/' className={router.pathname === "/" ? cssClasses.activelink : cssClasses.link}>
                        <MdDashboard />
                        <p>Dashboard</p>
                    </Link>
                    <Link onClick={() => navRef.current.classList.toggle("open")} href='/tasks' className={router.pathname === "/tasks" ? cssClasses.activelink : cssClasses.link}>
                        <FaTasks />
                        <p>Tasks</p>
                    </Link>
                    <Link onClick={() => navRef.current.classList.toggle("open")} href='/bin' className={router.pathname === "/bin" ? cssClasses.activelink : cssClasses.link}>
                        <FaRecycle />
                        <p>Recycle Bin</p>
                    </Link>
                </div>
                <button className={cssClasses.logout}
                    onClick={() => {
                        authDispatch({ type: "LOGOUT" });
                        setAlert({ message: "Loggedout successfully", type: 'red' });
                        router.push("/auth/signin");
                    }}>
                    <MdLogout />
                    <p>Log Out</p>
                </button>
            </nav >
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </>)
}

export default Navbar;