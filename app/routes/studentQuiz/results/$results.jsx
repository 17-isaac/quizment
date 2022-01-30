import { useLocation, useLoaderData } from "remix";
import { fdb } from "../../../utils/firestore";
import { db } from "../../../utils/db.server";
import { useState, useEffect } from "react";
//import animationData from '../../lotties';


export async function loader({ params, request }) {
    const resultsTemp = params.results;
    const results = resultsTemp.split('+')
    const QuizHistory = await db.quizHistory.create({
        data: {
            quizid: results[0],
            studentid: "18",
            pointsearned: parseInt(results[1]),
            marksearned: parseInt(results[2])
        },
    })

    const StudentPt = await db.student.update({
        where: {
            studentID: 18,
        },
        data: {
            totalPts: { increment: parseInt(results[1]) },
        },
    });
    const temp = "wow"
    return temp
}


export default function results() {
    const location = useLocation()
    const results = location.state.doc;
    console.log(JSON.stringify(results) + "RESULTS PAGE")
    console.log("THIS IS HERERER")

    const data = useLoaderData();

    return (
        <div className="result-screen">
            <h1>Redeemed!</h1>
            <p>{data}</p>
        </div>
    )
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