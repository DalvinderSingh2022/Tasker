import { authContext, authReducer, initialAuthState } from '@/store/auth';
import { tasksContext, tasksReducer, initialTasksState } from '@/store/tasks';
import { useReducer } from 'react';

import cssClasses from "../styles/auth.module.css";
import "../styles/globals.css";

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
    const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialTasksState);

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