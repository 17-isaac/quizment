import { initializeApp } from "firebase/app";
import { useNavigate, useNavigationType } from "remix";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const dotenv = require("dotenv");
dotenv.config();

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
const firebaseApp = initializeApp(firebaseConfig);

// analytics
const analytics = getAnalytics(firebaseApp);

//authentication
const auth = getAuth();

//initialize FireStore
const fdb = getFirestore();

async function authStatus(userType) {
  await onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      if (userType === 1) {
        useNavigate('/studentDashboard');
      } else if (userType === 2) {
        useNavigate('/');
      }
    }
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
}
export { auth, fdb, authStatus };