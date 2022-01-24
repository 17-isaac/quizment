// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// const dotenv = require("dotenv");
// dotenv.config();

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {

//   apiKey: process.env.DB_apiKey,
// authDomain: process.env.DB_authDomain,
// databaseURL: process.env.DB_databaseURL,
// projectId: process.env.DB_projectId,
// storageBucket: process.env.DB_storageBucket,
// messagingSenderId: process.env.DB_messagingSenderId,
// appId: process.env.DB_appId,
// measurementId: process.env.DB_measurementId
  apiKey: "AIzaSyAFY9L3JNCYGf5APtJM9QallQ8TLXvFWDU",
  authDomain: "quizment-ae4a6.firebaseapp.com",
  databaseURL: "https://quizment-ae4a6-default-rtdb.firebaseio.com",
  projectId: "quizment-ae4a6",
  storageBucket: "quizment-ae4a6.appspot.com",
  messagingSenderId: "774729961857",
  appId: "1:774729961857:web:87e44344039ae5dd875880",
  measurementId: "G-4GXXKNTKV9"
};

// initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//authentication
const auth = getAuth(firebaseApp);

//initialize FireStore
const fdb =getFirestore();

// export
export { auth, fdb };