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
  const data = {
    studentDetailsData: await db.student.findUnique({
      where: {
        studentID: 16,
      },
      select: {
        name: true,
        Uid: true,
        streaks: true,
        lastLogin:true,
      
      },
    }),
 
  };
 

  return data;
}






export default function StudentDashboardContent() {
  const data = useLoaderData();
// const lastLogin=BigInt(data.studentDetailsData.lastLogin).toString()





  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles,  }) => {
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
        }
         else if (command === "newsResource") {
          window.open("http://localhost:3000/newsResource", "_self");
        }
      },
    });
  }, []);


  useEffect(()=>{
    const currentLogin=new Date().getTime();
 
  console.log("current Login "+currentLogin)

  



  })

  return (
    <div>
      <p>Name: {data.studentDetailsData.name}</p>
      <p>Uid: {data.studentDetailsData.Uid}</p>
      <p>Streaks: {data.studentDetailsData.streaks}</p>
   
    </div>
  );
}
