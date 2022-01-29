import { db } from "../../utils/db.server";
import { useEffect } from "react";
import { useLoaderData, useNavigate, redirect } from "remix";

export async function action({ request }) {
    
}

function QuizResult({result,retry}){
console.log(result + "results PAGESSS")


useEffect(async() => {
    if(result.total){
        const users =   await db.quizHistory. create({
        data: {
            quizid: result.quizDocId,
            studentid: "23",
            pointsEarned: result.pointsEarned,
            marksEarned: result.correct
        },
    })
    console.log("its inside here")
    }
  
    
})


    return(
        <div className="result-screen">
            <h2>Result: {result.percentage}%</h2>
            <p>Selected {result.correct} correct options of {result.total} questions</p>
            <p>you earned {result.pointsEarned} Points!</p>
            <button onClick={retry}>Retry</button>
        </div>
    )
}
export default QuizResult