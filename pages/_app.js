import { authContext, authReducer, initialAuthState } from '@/store/auth';
import { tasksContext, tasksReducer, initialTasksState } from '@/store/tasks';
import { useEffect, useReducer } from 'react';


import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

import cssClasses from "../styles/auth.module.css";
import "../styles/globals.css";

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
    const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialTasksState);

    useEffect(() => {
        if (localStorage.getItem("todoweb") && !authState.uid) {
            console.log("loading user")
            authDispatch({
                type: "LOGIN",
                payload: JSON.parse(localStorage.getItem("todoweb"))
            })
        }
    }, []);

    useEffect(() => {
        async function database() {
            const querySnapshot = await getDocs(collection(db, authState.uid));
            if (querySnapshot.size !== tasksState.length) {
                querySnapshot.forEach((task) => {
                    if (task.data().section === "task") {
                        tasksDispatch({
                            type: "ADDTASK",
                            payload: { task: task.data(), uid: task.id }
                        });
                    }
                });
            }
        }
        if (authState.uid) {
            console.log("loading tasks")
            database();
        }
    }, [authState])

    return (
        <tasksContext.Provider value={{ tasksState, tasksDispatch }}>
            <authContext.Provider value={{ authState, authDispatch }}>
                <main className={router.pathname.includes("/auth/") ? cssClasses.main : ""}>
                    <Navbar />
                    <article>
                        <Component {...pageProps} />
                    </article>
                </main>
            </authContext.Provider>
        </tasksContext.Provider>
    );
}

export default MyApp;