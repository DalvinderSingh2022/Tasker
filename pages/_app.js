import { authContext, authReducer, initialAuthState } from '@/store/auth';
import { useReducer } from 'react';

function MyApp({ Component, pageProps }) {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

    return (
        <authContext.Provider value={{ authState, authDispatch }}>
            <Component {...pageProps} />
        </authContext.Provider>
    );
}

export default MyApp;