import firebase from 'firebase';
import firebase_apiKey from './config';

// Initialize Firebase
var config = {
  apiKey: firebase_apiKey,
  authDomain: "grow-calendar-react.firebaseapp.com",
  databaseURL: "https://grow-calendar-react.firebaseio.com",
  projectId: "grow-calendar-react",
  storageBucket: "",
  messagingSenderId: "677134713535"
};

firebase.initializeApp(config);

export default firebase;
  