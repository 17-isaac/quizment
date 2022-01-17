// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
const dotenv = require("dotenv");
dotenv.config();

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {

apiKey: process.env.DB_apiKey,
authDomain: process.env.DB_authDomain,
databaseURL: process.env.DB_databaseURL,
projectId: process.env.DB_projectId,
storageBucket: process.env.DB_storageBucket,
messagingSenderId: process.env.DB_messagingSenderId,
appId: process.env.DB_appId,
measurementId: process.env.DB_measurementId
};

// initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//authentication
const auth = getAuth(firebaseApp);

//initialize FireStore
const fdb =getFirestore();

// export
export { auth, fdb };