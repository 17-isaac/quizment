import {useState, useEffect } from "react";
import QuizScreen from "../components/QuizScreen"
import JoinScreen from "../components/JoinScreen"
import { fdb } from "../../utils/firestore";
import { db } from "../../utils/db.server";
import { useLoaderData, redirect, useLocation, useNavigate } from "remix";
import { collection, getDocs,getDoc, updateDoc, doc, query, where } from 'firebase/firestore';
//import Navbar  from "../components/Navbar";
 
export async function loader ({ params, request }) {


  

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

// export const action = async ({ request }) => {
//   let formData = await request.formData();
//   let {_action, ...value} = Object.fromEntries(formData);

//   if(_action ==="post"){

//   } const QuizHistory = await  db.quizHistory.create({
//     data: {
      
//       quizid: "quiz",
//       studentid: "18",
//       pointsearned: 100,
//       marksearned:5
//   },
// })
// }


export default function startQuiz(){
const [isQuizStarted, setisQuizStarted] = useState(false);
const [results, setResults] = useState([]);
   const navigate = useNavigate();

 async function result(index){
//const newResult = index.quizDocId+index.pointsEarned+index.correct"
    navigate(`/studentQuiz/results/${index.quizDocId}`+`+${index.pointsEarned}`+`+${index.correct}`, {state :{ doc : index}})
  //  const QuizHistory = await  db.quizHistory.create({
  //       data: {
          
  //         quizid: index.quizDocId,
  //         studentid: "18",
  //         pointsearned: index.pointsEarned,
  //         marksearned:index.marksEarned
  //     },
  // })
}


return(
<>

<div className ="quiz-container">
    { isQuizStarted ? (
        <QuizScreen retry={()=>setisQuizStarted(false)}
        setResults={(index) => {
          console.log("INDEX HERE" + index)
          if (index !== null) {
              console.log( JSON.stringify(index)+ " this is the setAnswer currentQUes index")
              result(index)
          }
         
          
      }}/>
       
    ) : (
        <JoinScreen start={()=>setisQuizStarted(true)}/>
    )}
    
</div>
</>


);
}
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </head>
      <body>
     <div>
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_aiphuevx.json"  background="transparent"  speed="1"  
        style={{width: 600, height: 600,  'margin-left':'25%'}}  loop controls autoplay></lottie-player> 
     </div>
      </body>
    </html>
  );
}