import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authContext } from "@/store/auth";

import { FaPlus } from "react-icons/fa";

import cssClasses from "../styles/dashboard.module.css";
import NewTask from "@/components/NewTask";

const index = () => {
    const router = useRouter();
    const [newTask, setNewTask] = useState(false);
    const { authState, authDispatch } = useContext(authContext);

    useEffect(() => {
        (localStorage.getItem("todoweb")) ?
            authDispatch({ type: "RETRIEVE" }) :
            router.push("/auth/signin");
    }, []);

    return (
        <>
            <header className={cssClasses.header}>
                <div>
                    hello, {authState?.displayName}
                </div>
                <button onClick={() => setNewTask(prev => !prev)}><FaPlus /></button>
            </header>
            {newTask && <NewTask removeContainer={() => setNewTask(prev => !prev)} />}
        </>
    )
}

export default index;