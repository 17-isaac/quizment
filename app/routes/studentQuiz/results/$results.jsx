import { useLocation, useLoaderData } from "remix";
import { fdb } from "../../../utils/firestore";
import { db } from "../../../utils/db.server";
import { useState, useEffect } from "react";



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
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
        </body>
      </html>
    );
  }