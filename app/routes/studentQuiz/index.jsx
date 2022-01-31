import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import { db } from "../../utils/db.server";
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
  //this is where ALL the quiz ID are kept
  //const allQuizID = modifiedEvents
  var result = data.map(quiz => (quiz.quizid));

const q = query(collection(fdb, "Quiz"), where("publish", "==", "1"));
  const querySnapshot = await getDocs(q);
  const modifiedEvents = querySnapshot.docs.map((doc) => {

    if (result.includes(doc.id)) {
    } else {

      const eventData = doc.data()
      eventData.id = doc.id
      return eventData;
    }
  });
  const modifiedEvents2 = querySnapshot.docs.map((doc) => {

    if (result.includes(doc.id)) {
      const eventData = doc.data()
      eventData.id = doc.id
      return eventData;
    } else {
    }
  });




  var filtered = modifiedEvents.filter(function (el) {
    return el != null;
  });

  var filtered2 = modifiedEvents2.filter(function (el) {
    return el != null;
  });

  const allQuiz = [filtered, filtered2]
  return allQuiz;
};

export default function studentQuiz() {
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState("")
 
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


  function bringToStartQuiz(e) {
    const value = e.target.value;
    let quiz = {
      docId: value
    }
    navigate(`../../studentQuiz/${value}`, { state: { quiz } });
  }

  const data = useLoaderData();
  const quizNotDone = data[0];
  const quizDone = data[1]

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