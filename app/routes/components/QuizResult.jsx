import { db } from "../../utils/db.server";
import { useEffect } from "react";
import { useLoaderData, useNavigate, redirect } from "remix";



export default function QuizResult({result,retry,setResults }){
console.log(JSON.stringify(result) + "results PAGESSS")
const navigate = useNavigate;


   function bringToResults(){
// navigate('/studentQuiz/results',  { state: result});
setResults(result);
   }
    
   return   (
        <div className="result-screen">
            <h2>Result: {result.percentage}%</h2>
            <p>Selected {result.correct} correct options of {result.total} questions</p>
            <p>you earned {result.pointsEarned} Points!</p>
            <button onClick={retry}>Retry</button>
            <button type="submit" name="_action" value="post" onClick={bringToResults}>Click here to Redeem POINTSSS</button>
        </div>
    )
}
