import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { useEffect, useState, createRef } from "react";
import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";
//  import addTwoNum from "~/components/algorithm/sum";
//  import performanceCal from "~/components/algorithm/performanceCal"
// import NewsCards from "~/components/NewsCards";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

export async function loader() {
 
  let data = {
    studentDetailsData: await db.student.findUnique({
      where: {
        studentID: 16,
      },
      select: {
        name: true,
        totalPts:true,
        redeemedPts:true,

        streaks: true,
        lastLogin: true,
      },
    }),
  };


  // await db.Student.update({
  //   where: {
  //     name: "isaa.71717@gmail.com",
  //   },
  //   data: {
  //     lastLogin: new Date().getTime(),
  //   },
  // });


  // await db.Student.upsert({
  //   where: {
  //     name: 'isaa.71717@gmail.com',
  //   },
  //   update: {
  //     streaks: 1,
  //   },
  //   create: {
  //     name: 'isaa.71717@gmail.com',
  //     streaks: 2,
  //   },
  // })

  const currentLogin = new Date().getTime();

  let lastLog = data.studentDetailsData.lastLogin.toString();
  let name = data.studentDetailsData.name;
  let totalPts=data.studentDetailsData.totalPts
  let redeemedPts=data.studentDetailsData.redeemedPts
  let streaks = data.studentDetailsData.streaks;
  let diffTime = currentLogin - lastLog;
  console.log("-----------------------------");
  console.log(diffTime);
  console.log("-----------------------------");

  if (diffTime >= 28800000 && diffTime <= 86400000) {
    console.log("Streak up");
    //   await db.student.update({
    //   where: {
    //     name: data.studentDetailsData.name,
    //   },
    //   data: {
    //     streaks:data.studentDetailsData.streaks +1
    //   },
    // })
  } else if (diffTime > 86400000) {
    console.log("streak 0");
    // await db.student.update({
    //   where: {
    //     name: data.studentDetailsData.name,
    //   },
    //   data: {
    //     streaks: 0,
    //   },
    // });
  } else {
    console.log("Remain the sameeeee");

    console.log("executed");
  }

  let allData = {
    lastLogin: lastLog,
    sName: name,
    sStreaks: streaks,
    totalPoints:totalPts,
    rPts:redeemedPts
  };

  // JSON.stringify(this,
  //   (key,)=>(typeof value === 'bigint'))

  //   if(typeof data.studentDetailsData.lastLogin ==='bigint'){
  //     JSON
  //   }

  return allData;
}

export default function StudentDashboardContent() {
  const data = useLoaderData();

  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "studentProg") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress",
            "_self"
          );
        } else if (command === "studentDash") {
          window.open("http://localhost:3000/StudentDashboard", "_self");
        } else if (command === "newsResource") {
          window.open("http://localhost:3000/newsResource", "_self");
        }
      },
    });
  }, []);

  useEffect(async () => {
    // const currentLogin=new Date().getTime();
    // const lastLogin=data.lastLogin
    //   diffTime=28800001  //up
    //   diffTime=86400002  // 0
    //   diffTime=28800000-3 //remain the same
    // console.log("current Login "+currentLogin)
    // console.log("Last login "+BigInt(lastLogin))
    // console.log("Difference in time "+diffTime)
    // if (diffTime >= 28800000 && diffTime <= 86400000){
    //   console.log("Streak up")
    // }
    // else if (diffTime > 86400000) {
    //   console.log("streak 0")
    // }
    // else{
    //   console.log("Remain the sameeeee")
    //   console.log("executed")
    // }
  }, []);

  return (
    <div>
      <p>Name: {data.sName}</p>

      <p>Total points: {data.totalPoints}</p>
      <p>Redeemable points:{data.rPts}</p>

      <p>Streaks: {data.sStreaks}</p>

    
    </div>
  );
}
