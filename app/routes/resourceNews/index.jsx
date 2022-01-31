
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { useEffect, useState } from "react";

//importing NewsCards from component
import NewsCards from "~/components/NewsCards/NewsCards";


//info card display
const infoCards = [
  {
    color: "#1565c0",
    title: "News by category",
    text: "Try saying 'give me the latest' : Business, Entertainment, Technology,Health,Science,Sports,Technology",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    text: " Try saying 'tell me news on': global warming, bitcoin ",
  },
  {
    color: "#283593",
    title: "News by Sources",
    text: "Try saying 'give me the news from': ABC News, CNN, BBC News",
  },
];


//links for styling
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}


export default function newsResourceContent() {
  const data = useLoaderData();
//initialisation state variable for newsarticle
  const [newsArticles, setNewsArticles] = useState([]);
//initialisation state variable for activearticle
  const [activeArticle, setActiveArticle] = useState(-1);


  //useEffect for alan


  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "open") {
         
          window.open(articles[number - 1].url, "_blank");
        } else if (command === "studentProg") {
          window.open(
            "http://localhost:3000/teacherViewStudentProgress",
            "_self"
          );
        } else if (command === "studentDash") {
          window.open("http://localhost:3000/StudentDashboard", "_self");
        } else if (command === "testCommand") {
          alert("command done");
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
      },
    });
  }, []);


  return (
    <div>
      <h1> News</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}
