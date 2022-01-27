import {useState} from "react";
import QuizScreen from "../components/QuizScreen"
import JoinScreen from "../components/JoinScreen"
import { fdb } from "../../utils/firestore";
import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
//import Navbar  from "../components/Navbar";
export async function loader() {
  const querySnapshot = await getDocs(query(collection(fdb, "Questions"), where("quizDocID", "==","pbXowoTjMR7QWEN9pe18")));
  const modifiedEvents = querySnapshot.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });
  const querySnapshot2 = await getDocs(query(collection(fdb, "OpenEndedQues"), where("quizDocID", "==","pbXowoTjMR7QWEN9pe18")));
  const modifiedEvents2 = querySnapshot2.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });
  const allQuestions = [].concat(modifiedEvents, modifiedEvents2);
  return allQuestions;
};

function startQuiz(){


const [isQuizStarted, setisQuizStarted] = useState(false);
return(
<>

<div className ="quiz-container">
    { isQuizStarted ? (
        <QuizScreen retry={()=>setisQuizStarted(false)}/>
    ) : (
        <JoinScreen start={()=>setisQuizStarted(true)}/>
    )}
    
</div>
</>


);
}export default startQuiz;