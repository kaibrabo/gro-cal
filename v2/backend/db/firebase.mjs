/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBz9S9iDJXvGIpkjQPVo14jV5lpPovwqwM",
        authDomain: "grow-calendar-react.firebaseapp.com",
        databaseURL: "https://grow-calendar-react.firebaseio.com",
        projectId: "grow-calendar-react",
        storageBucket: "grow-calendar-react.appspot.com",
        messagingSenderId: "677134713535",
        appId: "1:677134713535:web:7ee95816f7da407b6b7c0a",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // auth
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // firestore
    const db = getFirestore(app);

    return {
        auth,
        provider,
        signInWithRedirect,
        getRedirectResult,
        db,
        doc,
        getDoc,
        setDoc,
    };
}