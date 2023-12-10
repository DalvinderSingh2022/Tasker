import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { authContext } from "@/store/auth";

const login = ({ }) => {
    const { authDispatch } = useContext(authContext);
    const router = useRouter();
    const [user, setUser] = useState({
        email: null,
        password: null
    });

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(userInfo => {
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
        <div>
            <div>
                <h1>Welcome back</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>
            <form onSubmit={(e) => handlesubmit(e)}>
                <div >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        value={user.email || ''}
                        onChange={(e) => handlechange(e)} />
                </div>
                <div >
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
                    <button type='submit'>Log In</button>
                </div>

                <div>
                    Don’t have an account?
                    <button type='button'><Link href='/auth/signin'>Sign In</Link></button>
                </div>
            </form>

        </div>
    )
}

export default login
