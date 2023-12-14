import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { authContext } from "@/store/auth";
import Alert from "@/components/Alert";

import authClasses from "../../styles/auth.module.css";

const signin = () => {
    const { authDispatch, authState } = useContext(authContext);
    const router = useRouter();
    const [alert, setAlert] = useState(null);
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
        if (!user.email || !user.password || !user.displayName) {
            setAlert({ message: "All fileds are required", type: 'yellow' });
        } else {
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
                    setAlert({ message: 'Registered successfully, Welcome ' + userInfo.user.displayName, type: 'blue' });
                    router.push('/');
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
                        <div className={authClasses.group}>
                            <label htmlFor="displayName">Name</label>
                            <input
                                type="text"
                                id='displayName'
                                name='displayName'
                                placeholder='Enter your name'
                                value={user.displayName || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <div className={authClasses.group}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                value={user.email || ''}
                                onChange={(e) => handlechange(e)} />
                        </div>
                        <div className={authClasses.group}>
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
                            <button type='submit' className={authClasses.submit}>Sign In</button>
                        </div>

                        <div>
                            Already have an account?
                            <button type='button' className={authClasses.change}><Link href='/auth/login'>Log In</Link></button>
                        </div>
                    </form>
                </div>
            </div>
            {alert && <Alert {...alert} setAlert={setAlert} />}
        </>
    )
}

export default signin;