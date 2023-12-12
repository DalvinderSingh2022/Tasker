import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useEffect, useReducer } from 'react';

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

    useEffect(() => {
        if (localStorage.getItem("todoweb") && !authState.uid) {
            authDispatch({
                type: "LOGIN",
                payload: {
                    user: JSON.parse(localStorage.getItem("todoweb"))
                }
            })
        }
    }, [authState]);

    useEffect(() => {
        async function database() {
            const querySnapshot = await getDocs(collection(db, authState.uid));
            querySnapshot.forEach((task) => {
                tasksDispatch({
                    type: querySnapshot.size !== tasksState.length ? "ADDTASK" : "UPDATETASK",
                    payload: {
                        task: {
                            ...task.data(),
                            uid: task.id,
                            status: (new Date(task.data().duedate).getTime() < new Date().getTime()) ? "delay" : task.data().status
                        }
                    }
                });
            });
        }
        if (authState.uid) {
            database();
        }
    }, [authState, tasksState]);

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