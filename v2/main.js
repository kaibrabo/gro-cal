import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { initUI } from './ui.mjs';

function main() {
    console.log("Main.js loaded");
    const firebase = initFirebase();

    initUI(firebase);
}
main();

function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBz9S9iDJXvGIpkjQPVo14jV5lpPovwqwM",
        authDomain: "grow-calendar-react.firebaseapp.com",
        databaseURL: "https://grow-calendar-react.firebaseio.com",
        projectId: "grow-calendar-react",
        storageBucket: "grow-calendar-react.appspot.com",
        messagingSenderId: "677134713535",
        appId: "1:677134713535:web:7ee95816f7da407b6b7c0a"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    return { auth, db };
}