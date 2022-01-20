import { useLoaderData, useNavigate } from "remix";
import { collection, getDocs } from 'firebase/firestore';
import { fdb } from "~/utils/firestore";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ModalPopup from './AddQuiz';
import Modal from 'react-modal';
import { Link } from "remix";
import { useState } from "react";


export async function loader() {
  const querySnapshot = await getDocs(collection(fdb, "Quiz"));
  const modifiedEvents = querySnapshot.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });

  return modifiedEvents;
};

export default function quizAdmin() {
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  function bringToEdit(e) {

    const value = e.target.value;
    console.log("quiz selected!!!" + value);
    navigate('/quizAdmin/EditQuiz', { state: { doc: value } });
  }


  const data = useLoaderData();
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
              <button type="button" variant="primary" value={quiz.id} onClick={bringToEdit}>Edit</button>
              
            </Card>
          </Col>
        )}
      </Row>

      <button onClick={setModalIsOpenToTrue} >WOW </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >

        <button onClick={setModalIsOpenToFalse}>x</button>
        <ModalPopup />
      </Modal>


    </div>
  </>
  );
}