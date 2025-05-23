import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import { useEffect, useReducer, useState } from 'react';

import { db } from "@/firebase";
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { authContext, authReducer, initialAuthState } from '@/store/auth';
import { tasksContext, tasksReducer, initialTasksState } from '@/store/tasks';
import Loading from "@/components/Loading";

import cssClasses from "../styles/auth.module.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
    const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialTasksState);
    const [updateTask, setUpdateTask] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("todoweb") && !authState.uid) {
            authDispatch({
                type: "LOGIN",
                payload: {
                    user: JSON.parse(localStorage.getItem("todoweb"))
                }
            })
        }
        async function database() {
            const querySnapshot = await getDocs(collection(db, authState.uid));
            if (querySnapshot.size !== tasksState.length) {
                querySnapshot.forEach((task) => {
                    const taskData = task.data();
                    tasksDispatch({
                        type: "ADDTASK",
                        payload: {
                            task: {
                                ...taskData,
                                uid: task.id,
                                status: (new Date(taskData.duedate).getTime() < new Date().getTime()) ? "delay" : taskData.status
                            }
                        }
                    });
                });
            }
        }
        console.log("useEffect")
        if (authState.uid) {
            database();
        }
        setLoading(false);
    }, [authState]);

    useEffect(() => {
        async function database() {
            await setDoc(doc(collection(db, authState.uid), updateTask.uid), { ...updateTask })
                .then(() => {
                    tasksDispatch({
                        type: "UPDATETASK",
                        payload: { task: { ...updateTask } }
                    });
                    setUpdateTask({});
                })
                .catch(error => {
                    console.error(error);
                })
        }
        if (Object.keys(updateTask).length) {
            database();
        }
    }, [updateTask]);

    if (loading) {
        return <Loading full={true} />
    }

    return (
        <tasksContext.Provider value={{ tasksState, tasksDispatch, setUpdateTask }}>
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