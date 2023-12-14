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
    const [taskToUpdate, setTaskToUpdate] = useState(null)

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
                                uid: taskData.id,
                                status: (new Date(taskData.duedate).getTime() < new Date().getTime()) ? "delay" : taskData.status
                            }
                        }
                    });
                });
            }
        }
        if (authState.uid) {
            database();
        }
    }, [authState]);

    useEffect(() => {
        setTaskToUpdate(tasksState.filter(task => task.toUpdate));
    }, [tasksState]);

    useEffect(() => {
        async function database() {
            await setDoc(doc(collection(db, authState.uid), taskToUpdate[0].uid), { ...taskToUpdate[0] })
                .then(() => {
                    tasksDispatch({
                        type: "UPDATETASK",
                        payload: {
                            task: {
                                ...taskToUpdate,
                                toUpdate: false
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                })
        }
        if (taskToUpdate?.length > 0) {
            database();
        }
    }, [taskToUpdate])

    useEffect(() => {
        if (localStorage.getItem("todoweb") && !authState) {
            return <Loading full={true} />
        }
    })

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