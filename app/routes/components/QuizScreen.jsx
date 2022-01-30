import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

import { useState } from "react";
import QuizResult from "../components/QuizResult"
import Question from "../components/Question"




function QuizScreen({ retry, setResults }) {
    //
    const data = useLoaderData();
    const QuestionList = data[0]
    const QuizDetails = data[1]
    const quizDocId = data[2]
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length))
    const isQuestionEnd = currentQuestionIndex === QuestionList.length;

    function calculateResult() {
        let correct = 0;
        const totalMarks = QuizDetails.totalMarks;
        const markPerQues = totalMarks / QuestionList.length;
        let pointsEarned = 0;
        const totalPoints = QuizDetails.totalPoints;
        const pointPerQues = totalPoints / QuestionList.length


        QuestionList.forEach((question, index) => {
            if (question.choices) {
                if (question.answer == markedAnswers[index]) {
                    correct += markPerQues;
                    pointsEarned += pointPerQues;
                }
            } else if (question.answers) {
                const openEndedAns = markedAnswers[index]
                const usersInput = (openEndedAns).split(' ');
                const thisAnswer = question.answers
                Object.values(thisAnswer).forEach(ans => {
                    if (usersInput.includes(ans)) {
                        const numOfOpenEndAns = question.answers.length;
                        const markPerAns = markPerQues / numOfOpenEndAns
                        correct += markPerAns
                        pointsEarned += pointPerQues;
                    }
                }
                )
            }
        })



        return {
            quizDocId: quizDocId,
            total: QuizDetails.totalMarks,
            correct: correct,
            pointsEarned: pointsEarned,
            percentage: Math.trunc((correct / QuizDetails.totalMarks) * 100)
        }
    }


    return (
        <>
            <div className="quiz-screen">
                {
                    isQuestionEnd ? (
                        <QuizResult
                            result={calculateResult()}
                            retry={retry}
                            setResults={setResults} />
                    ) : (

                        <Question
                            question={QuestionList[currentQuestionIndex]}
                            totalQuestion={QuestionList.length}
                            currentQuestion={currentQuestionIndex + 1}
                            setAnswer={(index) => {
                                if (index !== null) {
                                    setMarkedAnswers((arr) => {
                                        let newArr = [...arr];
                                        if ((newArr.length) == (currentQuestionIndex)) {
                                            return newArr;
                                        } else {
                                            newArr[currentQuestionIndex] = index;
                                            return newArr;
                                        }

                                    });
                                }
                                setCurrentQuestionIndex(currentQuestionIndex + 1);
                            }}

                        />
                    )}

            </div>

        </>
    );
}
export default QuizScreen;
export function ErrorBoundary({ error }) {
    console.error(error);
    return (
        <html>
            <head>
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            </head>
            <body>
                <div>
                    <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_aiphuevx.json" background="transparent" speed="1"
                        style={{ width: 600, height: 600, 'margin-left': '25%' }} loop controls autoplay></lottie-player>
                </div>
            </body>
        </html>
    );
}