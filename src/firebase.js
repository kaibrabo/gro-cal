import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "grow-calendar-react.firebaseapp.com",
    databaseURL: "https://grow-calendar-react.firebaseio.com",
    projectId: "grow-calendar-react",
    storageBucket: "grow-calendar-react.appspot.com",
    messagingSenderId: "677134713535",
    appId: "1:677134713535:web:7ee95816f7da407b6b7c0a"
};

firebase.initializeApp(config);

export default firebase;
