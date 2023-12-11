import { createContext } from "react";

export const authContext = createContext();

export const initialAuthState = {
    isAuthenticated: false,
    displayName: null,
    email: null,
    password: null,
    uid: null,
};

export function authReducer(state, action) {
    if (action.type === "LOGIN") {
        localStorage.setItem("todoweb", JSON.stringify({ ...action.payload }));
        return {
            isAuthenticated: true,
            ...action.payload
        }
    }
    if (action.type === "LOGOUT") {
        localStorage.removeItem("todoweb");
        return { ...initialAuthState }
    }
    if (action.type === "RETRIEVE") {
        const user = JSON.parse(localStorage.getItem("todoweb"));
        return {
            isAuthenticated: true,
            ...user
        }
    }
}