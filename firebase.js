import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxJ0nL7YvYTLrHCubomGINJ2Kuh-Tt7w8",
    authDomain: "todo-web-1180e.firebaseapp.com",
    databaseURL: "https://todo-web-1180e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-web-1180e",
    storageBucket: "todo-web-1180e.appspot.com",
    messagingSenderId: "487754811179",
    appId: "1:487754811179:web:f0d486b055c2b0933a676e",
    measurementId: "G-LEPLPB7JRQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);