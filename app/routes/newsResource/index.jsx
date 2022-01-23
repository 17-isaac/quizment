import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { useEffect, useState,createRef } from "react";
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
// import NewsCards from "~/components/NewsCards";

const infoCards=[

  {color:'#1565c0',title:'News by category',text:'Try saying give me the latest : Business, Entertainment, Technology'},
  {color:'#4527a0',title:'News by Terms',text:' Try saying What\'s up with : Bitcoin, Playstation 5, Smartphone'},
  {color:'#283593',title:'News by Sources',text:'Try saying give me the news from: ABC News, CNN, BBC News'}

]

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

  const [newsArticles, setNewsArticles] = useState([]);

 


  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "b1283306f4a5fd0478ce1ceec798da192e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles,number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1)
        }else if(command === 'open'){
          console.log(number)
          window.open(articles[number].url,'_blank')
        }else if(command === 'studentProg'){
          window.open('http://localhost:3000/teacherViewStudentProgress','_self')
        }
        else if (command === "studentDash") {
          window.open("http://localhost:3000/StudentDashboard", "_self");
        }
      },
    });


  }, []);


 




if(!newsArticles.length){
  return(

   <Row>
     {
       infoCards.map((infoCard,i)=>(
         <Col key={i} className="col-2 m-3" style={{backgroundColor:infoCard.color,borderRadius:"2px"}}>

           <h3>{infoCard.title}</h3>

           <h5>{infoCard.text}</h5>

         

           </Col>
       ))
     }
   </Row>
  )
}


  return (
    <div>
 


<Row className='ml-auto mr-auto'   style={{ marginLeft: "auto",marginRight:"auto" }}>
      {newsArticles.map((newsArticle, i,activeArticle) => (
        <Card  variant="success" border={"secondary",activeArticle === i ? "danger" :null} md={4} className="col-3 m-1 success border-3"key={i}>
        

          <Card.Img
            variant="top"
            src={
              newsArticle.urlToImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_7kaCfa-hMzgXQaDecnotMTjbbHhf1RX8N66aCTgDyizd9saHA8E2Wb-xNAqxyFz1s0&usqp=CAU"
            }
          />
          <Card.Body variant="success">
            <Card.Title>Title: {newsArticle.title}</Card.Title>
            <Card.Text>Description: {newsArticle.description}</Card.Text>

            <Card.Title>Source: {newsArticle.source.name}</Card.Title>
            <Button href={newsArticle.url}>Learn More</Button>
            <Card.Text>{i + 1}</Card.Text>
          </Card.Body>
        </Card>
      ))}
</Row>

    </div>
  );
}
