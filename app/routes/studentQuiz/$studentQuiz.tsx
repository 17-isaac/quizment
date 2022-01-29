import {useState, useEffect } from "react";
import QuizScreen from "../components/QuizScreen"
import JoinScreen from "../components/JoinScreen"
import { fdb } from "../../utils/firestore";
import { db } from "../../utils/db.server";
import { useLoaderData, useNavigate, redirect, useLocation, LoaderFunction, ActionFunction } from "remix";
import { collection, getDocs,getDoc, updateDoc, doc, query, where } from 'firebase/firestore';
//import Navbar  from "../components/Navbar";
 
export let loader: LoaderFunction = async ({ params, request }) => {

  const q =  query(collection(fdb, "Questions"), where("quizDocID", "==", params.studentQuiz));
  const querySnapshot = await getDocs(q);
  const modifiedEvents =  querySnapshot.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });

  const q2 =  query(collection(fdb, "OpenEndedQues"), where("quizDocID", "==", params.studentQuiz));
  const querySnapshot2 = await getDocs(q2);
  const modifiedEvents2 =  querySnapshot2.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });
 
  // console.log(allQuestions)


  const docRef = doc(fdb, "Quiz", params.studentQuiz);
  const docSnap = await getDoc(docRef);
  const quizDetails = docSnap.data();
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  

 const allQuestions = [].concat(modifiedEvents, modifiedEvents2);
 const returning = [].concat([allQuestions], [quizDetails])
 const final = [].concat(returning, [(params.studentQuiz)])


  return final;
}




export default function startQuiz(){


  function quizHistory(result:any){
    const users:any =   db.quizHistory.create({
      data: {
        quizid: "",
        studentid: "23",
        pointsearned: 5,
        marksearned:5
    },
  })
  
  }
 
const [isQuizStarted, setisQuizStarted] = useState(false);
return(
<>

<div className ="quiz-container">
    { isQuizStarted ? (
        <QuizScreen retry={()=>setisQuizStarted(false)}
        />
    ) : (
        <JoinScreen start={()=>setisQuizStarted(true)}/>
    )}
    
</div>
</>


);
}