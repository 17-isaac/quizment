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
const firebaseApp = initializeApp(firebaseConfig);

//authentication
const auth = getAuth();

//initialize FireStore
const fdb = getFirestore();

// getting id of user 
async function getUserId() {
  let uid;
  return await new Promise((resolve, reject) => {
    const getCurrentUserID = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          uid = currentUser.uid;
          console.log("YES");
          resolve(uid);
        } else {
          uid = 0;
          console.log("User type not defined");
          resolve(uid);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(JSON.stringify(errorCode));
        console.log(JSON.stringify(errorMessage));
      }
    getCurrentUserID();
    });
  });
  // let uid;
  // if (user) {
  //   uid = user.uid;
  //   console.log(uid + "Hello");
  // } else {
  //   uid = 0;
  // }
  // return uid;
}

// authentication status
async function authStatus(userType) {
  onAuthStateChanged(auth, (currentUser) => {
    try {
      if (currentUser) {
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
      } else {
        if (window.location.pathname === '/auth' || window.location.pathname === '/') {
          console.log("Not Signed In.")
        } else {
          console.log("Access Denied");
          window.location.assign('http://localhost:3000/auth');
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(JSON.stringify(errorCode));
      console.log(JSON.stringify(errorMessage));
    }
  });
}

export { auth, fdb, authStatus, getUserId };