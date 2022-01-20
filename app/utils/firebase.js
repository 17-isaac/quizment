
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

async function authStatus(userType) {
  // let navigate = useNavigate();
  // const location = useLocation();
  await onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      if (userType === 1) {
        window.location.assign('http://localhost:3000/studentDashboard');
      } else if (userType === 2) {
        window.location.assign('http://localhost:3000/teacherDashboard');
      } else {
        window.location.assign('http://localhost:3000/auth');
      }
    }
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
}

export { auth, fdb, authStatus };