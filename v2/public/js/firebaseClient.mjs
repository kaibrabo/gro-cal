/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

// APP
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

// AUTHENTICATION
import {
    getAuth,
    getRedirectResult,
    signInWithRedirect,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// FIRESTORE DATABASE
import {
    doc,
    query,
    where,
    addDoc,
    getDoc,
    setDoc,
    getDocs,
    deleteDoc,
    collection,
    getFirestore,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

/**
 * Initializes Firebase configuration
 * @returns {(object)}
 */
export function initFirebase() {
    console.log("initFirebase");

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
        addDoc,
        app,
        auth,
        collection,
        db,
        deleteDoc,
        doc,
        getDoc,
        getDocs,
        getRedirectResult,
        GoogleAuthProvider,
        onAuthStateChanged,
        provider,
        query,
        setDoc,
        signInWithRedirect,
        where,
    };
}
