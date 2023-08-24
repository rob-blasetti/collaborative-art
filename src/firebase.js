import firebase from 'firebase/compat/app'; // Import firebase from the compat package
import 'firebase/compat/auth'; // Import the auth module
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDcO--tmoUdWTodIoEwB-f4nNRcLqPCbpQ",
  authDomain: "collaborative-art-app.firebaseapp.com",
  projectId: "collaborative-art-app",
  databaseURL: "https://collaborative-art-app-default-rtdb.firebaseio.com",
  storageBucket: "collaborative-art-app.appspot.com",
  messagingSenderId: "928572595366",
  appId: "1:928572595366:web:3bba14231b371232346867",
  measurementId: "G-28PKQV6TSZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // Get the authentication instance

export { auth }; // Export the auth instance

export default firebase;
