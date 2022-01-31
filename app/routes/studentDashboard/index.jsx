import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { useEffect } from "react";

//links for styling
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
        studentID: 17,
      },
      select: {
        name: true,
        totalPts: true,
        redeemedPts: true,

        streaks: true,
        lastLogin: true,
      },
    }),
  };

  const currentDate = new Date().getTime();
  const uDate = await db.student.update({
    where: {
      studentID: 17,
    },
    data: {
      lastLogin: currentDate,
    },
  });

  let lastLog = data.studentDetailsData.lastLogin.toString();

  let name = data.studentDetailsData.name;
  let totalPts = data.studentDetailsData.totalPts;
  let redeemedPts = data.studentDetailsData.redeemedPts;
  let streaks = data.studentDetailsData.streaks;
  let diffTime = currentDate - lastLog;

  if (diffTime >= 28800000 && diffTime <= 86400000) {
    console.log("Streak up");
    await db.student.update({
      where: {
        studentID: 17,
      },
      data: {
        streaks: streaks + 1,
      },
    });
  } else if (diffTime > 86400000) {
    await db.student.update({
      where: {
        studentID: 17,
      },
      data: {
        streaks: 0,
      },
    });
  }

  let allData = {
    lastLogin: lastLog,
    sName: name,
    sStreaks: streaks,
    totalPoints: totalPts,
    rPts: redeemedPts,
  };

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

  return (
    <div>
      <p>Name: {data.sName}</p>

      <p>Total points: {data.totalPoints}</p>
      <p>Redeemable points:{data.rPts}</p>

      <p>Streaks: {data.sStreaks}</p>
    </div>
  );
}
