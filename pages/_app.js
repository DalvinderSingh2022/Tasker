import { authContext, authReducer, initialAuthState } from '@/store/auth';
import { useReducer } from 'react';

import cssClasses from "../styles/auth.module.css";
import "../styles/globals.css";

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

    return (
        <authContext.Provider value={{ authState, authDispatch }}>
            <main className={router.pathname.includes("/auth/") && cssClasses.main}>
                <Navbar />
                <Component {...pageProps} />
            </main>
        </authContext.Provider>
    );
}

export default MyApp;