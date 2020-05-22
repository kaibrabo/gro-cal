import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "grow-calendar-react.firebaseapp.com", // process.env.REACT_APP_AUTH_DOMAIN doesnt work
    databaseURL: "https://grow-calendar-react.firebaseio.com",
    projectId: "grow-calendar-react",
    storageBucket: "grow-calendar-react.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);

export default firebase;
