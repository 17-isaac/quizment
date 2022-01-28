import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import { db } from "~/utils/db.server";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Modal from 'react-modal';
import QuizPopup from '../studentQuiz/quizPopup'
import { Link } from "remix";
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
  var filtered = modifiedEvents.filter(function (el) {
    return el != null;
  });
  console.log("mordified  " + filtered)

  return filtered;
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
  function startQuiz(e){
   // navigate(`/quizAdmin/${quiz.docId}`, { state: { doc: quizDocID } });
  }
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }


  function bringToEdit(e) {
    const value = e.target.value;
    console.log("BUTTON LCICKED!!!" + value);
    let quiz = {
      docId:value
    }
    navigate(`../../startQuiz`, { state: { doc: value } });
  }

  const data = useLoaderData();
  console.log(data)

  return (<>
    <div>
      <h1></h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {data && data.map(quiz =>

          <Col>
            <Card border="warning">
              <Card.Title>{quiz.quizName}</Card.Title>
              <Card.Text>Points : {quiz.totalPoints}</Card.Text>
              <Card.Text>Subject : {quiz.subject}</Card.Text>
              <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
              <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>

              <Button type="button" variant="primary" onClick={() => startQuiz(quiz)}>start Quiz</Button>
            </Card>
          </Col>



        )}
      </Row>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <QuizPopup />
      <Button type="button" variant="primary" value={selectedQuiz} onClick={bringToEdit}>start Quiz</Button>
      </Modal>




    </div>
  </>
  );
}