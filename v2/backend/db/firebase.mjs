/*
    Copyright © 2024 Blumelist / Kainoa Ubaldo-Brabo. All Rights Reserved.
*/

import { logMessage } from "../../utils/log.mjs";

// APP
import { 
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// AUTHENTICATION
import {
    getAuth,
    getRedirectResult,
    signInWithRedirect,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// FIRESTORE DATABASE
import {
    doc,
    query, 
    where, 
    getDoc,
    setDoc,
    getDocs,
    collection, 
    getFirestore,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Initializes Firebase configuration
 * @returns {(object)}
 */
export function initFirebase() {
    logMessage("initFirebase");

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
        db,
        doc,
        auth,
        query, 
        where, 
        getDoc,
        setDoc,
        getDocs,
        provider,
        collection, 
        getRedirectResult,
        signInWithRedirect,
    };
}
