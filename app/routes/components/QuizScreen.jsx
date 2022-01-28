import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import { db } from "~/utils/db.server";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Modal from 'react-modal';
import QuizPopup from '../studentQuiz/quizPopup'
import { Link } from "remix";
import { useState } from "react";
import QuizResult from "../components/QuizResult"
import Question from "../components/Question"


function QuizScreen({ retry }) {
 //
 const data =useLoaderData(); 
   const QuestionList =  data[0]
   const QuizDetails = data[1]
     
    console.log(JSON.stringify(QuestionList) + "useLoader()")
    console.log(QuestionList.length + "QUESTION LIST")
    // let QuestionList = modifiedEvents;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length))
    const isQuestionEnd = currentQuestionIndex === QuestionList.length;

    function calculateResult() {
        let correct = 0;
        const totalMarks = QuizDetails.totalMarks;
        const markPerQues = totalMarks/QuestionList.length;

       
             QuestionList.forEach((question, index) => {
                 if(question.choices){
                     console.log(question.answer + " QUIES ANS" + markedAnswers[index])
            if (question.answer == markedAnswers[index]) {
                correct+=markPerQues;
            }
                 }else if(question.answers){
                     const openEndedAns = markedAnswers[index]
                    const usersInput= (openEndedAns).split(' ');
                    console.log(typeof question.answers + " this is the questions and answers")
                    const thisAnswer = question.answers
                    Object.values(thisAnswer).forEach(ans => {
                        console.log(ans);
                  if (usersInput.includes("this")) {
                        const numOfOpenEndAns = question.answers.length;
                        const markPerAns = markPerQues/numOfOpenEndAns
                        correct+=markPerAns
                         console.log("user got athat  right" )
                             }
                        }
                        )
                    console.log(usersInput)
                 }
        }).then(function(){
            //place update statement here for student table
        });
      
            console.log( 'check openEnded answers here')
        
       
        return {
            total: QuizDetails.totalMarks,
            correct: correct,
            percentage: Math.trunc((correct / QuestionList.length) * 100)
        }
    }


    return (
        <>
            <div className="quiz-screen">
                {
                    isQuestionEnd ? (
                        <QuizResult
                            result={calculateResult()}
                            retry={retry} />
                    ) : (
                        <Question
                            question={QuestionList[currentQuestionIndex]}
                            totalQuestion={QuestionList.length}
                            currentQuestion={currentQuestionIndex+1}
                            setAnswer={(index) => {
                                console.log("INDEX HERE" + index)
                                if(index!==null){
                                setMarkedAnswers((arr) => {
                                    let newArr = [...arr];
                                    console.log(arr + "NEW ARR32")
                                    if((newArr.length)==(currentQuestionIndex)){
                                        return newArr;
                                    }else{
                                       console.log(currentQuestionIndex +"NOW index")
                                       console.log(newArr.length + "newARRE lengtj")
                                    newArr[currentQuestionIndex] = index;
                                    
                                    console.log(newArr + "NEW ARR")
                                    return newArr; 
                                    }
                                  
                                });}
                                console.log(currentQuestionIndex +" this is the setAnswer currentQUes index")
                                setCurrentQuestionIndex(currentQuestionIndex+1);
                            }}
       
                        />
                    )}
            </div>

        </>
    );
}
export default QuizScreen;