import { useContext } from "react";
import Link from "next/link";

import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";

import { authContext } from "@/store/auth";

import cssClasses from "../styles/Navbar.module.css";

const Navbar = () => {
    const router = useRouter();
    const { authState, authDispatch } = useContext(authContext);

    if (!authState?.isAuthenticated)
        return <></>;

    return (
        <nav className={cssClasses.navbar}>
            <div>
                <div className={cssClasses.logo}>Todo App</div>
                <Link href='/' className={router.pathname === "/" ? cssClasses.activelink : cssClasses.link}>
                    <MdDashboard />
                    <p>Dashboard</p>
                </Link>
                <Link href='/tasks' className={router.pathname === "/tasks" ? cssClasses.activelink : cssClasses.link}>
                    <FaTasks />
                    <p>Tasks</p>
                </Link>
                <Link href='/bin' className={router.pathname === "/bin" ? cssClasses.activelink : cssClasses.link}>
                    <FaRecycle />
                    <p>Recycle Bin</p>
                </Link>
            </div>
            <button className={cssClasses.logout}
                onClick={() => {
                    authDispatch({ type: "LOGOUT" });
                    router.push("/auth/signin")
                }}>
                <MdLogout />
                <p>Log Out</p>
            </button>
        </nav >)
}

export default Navbar;