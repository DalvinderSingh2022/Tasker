import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { authContext } from "@/store/auth";

import authClasses from "../../styles/auth.module.css";
import Alert from "@/components/Alert";

const login = () => {
    const { authDispatch, authState } = useContext(authContext);
    const router = useRouter();
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState({
        email: null,
        password: null
    });

    useEffect(() => {
        if (authState?.isAuthenticated) {
            router.push("/");
        }
    }, [authState])

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            setAlert({ message: "All fileds are required", type: 'yellow' });
        } else {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(userInfo => {
                    authDispatch({
                        type: "LOGIN",
                        payload: {
                            user: {
                                displayName: userInfo.user.displayName,
                                email: userInfo.user.email,
                                password: user.password,
                                uid: userInfo.user.uid,
                            }
                        }
                    });
                    setAlert({ message: 'Logged In successfully, Welcome back ' + userInfo.user.displayName, type: 'blue' });
                }).catch(error => {
                    setAlert({ message: error.message, type: 'red' });
                    console.error(error);
                });
        }
    }
    return (
        <>
            <div className="globalBox">
                <div className={authClasses.box}>
                    <div>
                        <h1>Welcome back</h1>
                        <p>Welcome back! Please enter your details.</p>
                    </div>
                    <form className={authClasses.form} onSubmit={(e) => handlesubmit(e)}>
                        <div className={authClasses.group} >
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                value={user.email || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <div className={authClasses.group} >
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                placeholder='Enter password'
                                value={user.password || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>

                        <div>
                            <button type='submit' className={authClasses.submit}>Log In</button>
                        </div>

                        <div>
                            Don’t have an account?
                            <button type='button' className={authClasses.change}><Link href='/auth/signin'>Sign In</Link></button>
                        </div>
                    </form>
                </div>
            </div>
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </>
    )
}

export default login
