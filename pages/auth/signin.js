import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { authContext } from "@/store/auth";

import cssClasses from "../../styles/auth.module.css";

const login = () => {
    const { authDispatch, authState } = useContext(authContext);
    const router = useRouter();
    const [user, setUser] = useState({
        displayName: null,
        email: null,
        password: null,
        uid: null,
    });


    if (authState?.isAuthenticated) {
        router.push("/");
    }

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(userInfo => {
                updateProfile(auth.currentUser, { displayName: user.displayName });
                authDispatch({
                    type: "LOGIN",
                    payload: {
                        displayName: userInfo.user.displayName,
                        email: userInfo.user.email,
                        password: user.password,
                        uid: userInfo.user.uid,
                    }
                });
                router.push('/');
            }).catch(error => {
                console.error(error);
            });
    }
    return (
        <div className={cssClasses.container}>
            <div className={cssClasses.box}>
                <div>
                    <h1>Welcome back</h1>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                <form className={cssClasses.form} onSubmit={(e) => handlesubmit(e)}>
                    <div className={cssClasses.group}>
                        <label htmlFor="displayName">Name</label>
                        <input
                            type="text"
                            id='displayName'
                            name='displayName'
                            placeholder='Enter your name'
                            value={user.displayName || ''}
                            onChange={(e) => handlechange(e)} />
                    </div>
                    <div className={cssClasses.group}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            value={user.email || ''}
                            onChange={(e) => handlechange(e)} />
                    </div>
                    <div className={cssClasses.group}>
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
                        <button type='submit' className={cssClasses.submit}>Sign In</button>
                    </div>

                    <div>
                        Already have an account?
                        <button type='button' className={cssClasses.change}><Link href='/auth/login'>Log In</Link></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login;