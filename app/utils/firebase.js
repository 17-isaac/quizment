import { current } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFY9L3JNCYGf5APtJM9QallQ8TLXvFWDU",
  authDomain: "quizment-ae4a6.firebaseapp.com",
  databaseURL: "https://quizment-ae4a6-default-rtdb.firebaseio.com",
  projectId: "quizment-ae4a6",
  storageBucket: "quizment-ae4a6.appspot.com",
  messagingSenderId: "774729961857",
  appId: "1:774729961857:web:87e44344039ae5dd875880",
  measurementId: "G-4GXXKNTKV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authentication
const auth = getAuth(app);

//initialize FireStore
const fdb = getFirestore();

// authentication status
async function authStatus(userType) {
  if (userType == 1) {
    if (window.location.pathname.toLowerCase().includes('student')) {
    } else {
      window.location.assign('http://localhost:3000/studentDashboard');
    }
  } else if (userType == 2) {
    if (window.location.pathname.toLowerCase().includes('teacher')) {
    } else {
      window.location.assign('http://localhost:3000/teacherDashboard');
    }
  }
}

export { auth, fdb, authStatus };