import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import { db } from "~/utils/db.server";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Modal from 'react-modal';
import Lottie from 'react-lottie';
//import animationData from '../../lotties/error1';
import { useState } from "react";
import Button from 'react-bootstrap/Button';

export async function loader() {
 


  const data = await db.quizHistory.findMany({
    where: {
      studentid: "23",
    },
    select: {
      quizid: true
    }
  })
  console.log(JSON.stringify(data) + "is what the student has completed");
  //this is where ALL the quiz ID are kept
  //const allQuizID = modifiedEvents
  var result = data.map(quiz => (quiz.quizid));
  console.log(JSON.stringify(result) + "QUIZ students completed");


  const querySnapshot = await getDocs(collection(fdb, "Quiz"));
  const modifiedEvents = querySnapshot.docs.map((doc) => {

    if (result.includes(doc.id)) {
      console.log("TRUE DONT SHOW THIS")

    } else {
      console.log("DISPLAYING")
      const eventData = doc.data()
      eventData.id = doc.id
      return eventData;
    }
  });
  const modifiedEvents2 = querySnapshot.docs.map((doc) => {

    if (result.includes(doc.id)) {

      console.log("DISPLAYING")
      const eventData = doc.data()
      eventData.id = doc.id
      return eventData;
    } else {
      console.log("TRUE DONT SHOW THIS")
    }
  });




  var filtered = modifiedEvents.filter(function (el) {
    return el != null;
  });
  console.log("mordified  " + filtered)

  var filtered2 = modifiedEvents2.filter(function (el) {
    return el != null;
  });
  console.log("mordified  " + filtered2)

  const allQuiz = [filtered, filtered2]
  return allQuiz;
};

export default function studentQuiz() {
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState("")
  // function setModalIsOpenToTrue(e) {
  //   setSelectedQuiz(
  //     e.id
  //   )
  //   setModalIsOpen(true);

  // }
  function startQuiz(e) {
    // navigate(`/quizAdmin/${quiz.docId}`, { state: { doc: quizDocID } });
  }
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


  function bringToStartQuiz(e) {
    const value = e.target.value;
    console.log("BUTTON LCICKED!!!" + value);
    let quiz = {
      docId: value
    }
    navigate(`../../studentQuiz/${value}`, { state: { quiz } });
  }

  const data = useLoaderData();
  const quizNotDone = data[0];
  const quizDone = data[1]
  console.log(data)

  return (<>
    <div>
      <h1>Quiz Not Completed</h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {quizNotDone && quizNotDone.map(quiz =>

          <Col>
            <Card border="warning">
              <Card.Title>{quiz.quizName}</Card.Title>
              <Card.Text>Points : {quiz.totalPoints}</Card.Text>
              <Card.Text>Subject : {quiz.subject}</Card.Text>
              <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
              <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>

              <Button type="button" variant="primary" value={quiz.id} onClick={bringToStartQuiz}>start Quiz</Button>
            </Card>
          </Col>



        )}
      </Row>
      <h1>Quiz Completed</h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {quizDone && quizDone.map(quiz =>

          <Col>
            <Card border="warning">
              <Card.Title>{quiz.quizName}</Card.Title>
              <Card.Text>Points : {quiz.totalPoints}</Card.Text>
              <Card.Text>Subject : {quiz.subject}</Card.Text>
              <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
              <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>

              <Button type="button" variant="primary" value={quiz.id} onClick={bringToStartQuiz}>start Quiz</Button>
            </Card>
          </Col>



        )}
      </Row>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}>
        <button onClick={setModalIsOpenToFalse}>x</button>
      
        <Button type="button" variant="primary" value={selectedQuiz} onClick={bringToStartQuiz}>start Quiz</Button>
      </Modal>




    </div>
  </>
  );
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