import { Link, useLoaderData, useCatch, redirect, useParams ,LoaderFunction} from "remix";
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import Modal from 'react-modal';
import { fdb } from "../../utils/firestore";
import { Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

import AddMcqPopup from './EditQuiz/AddMcqPopup';
import AddOpenEndedPopup from './EditQuiz/AddOpenEndedPopup'
import EditQuiz from './editQuiz'
export let loader: LoaderFunction = async ({ params, request }) => {
  //let userId = await getUserId(request);
  //console.log(JSON.stringify(params.quizDocId) + "THIS IS PARAAM");
  const q = query(collection(fdb, "Questions"), where("quizDocID", "==", params.quizDocId));
  const querySnapshot = await getDocs(q);
  const modifiedEvents = querySnapshot.docs.map((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });

  const q2 = query(collection(fdb, "OpenEndedQues"), where("quizDocID", "==", params.quizDocId));
  const querySnapshot2 = await getDocs(q2);
  const modifiedEvents2 = querySnapshot2.docs.map((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const eventData = doc.data()
    eventData.id = doc.id
    return eventData
  });
  const Final = [modifiedEvents, modifiedEvents2]
  return Final;
};


export default function JokeRoute() {

  const [selectedQues, setSelected] = useState([])
  const [questionDocID, setQuestionDocID] = useState("")
  const [stateMcq, setStateMcq] = useState({
    question: [],
    choice1: [],
    choice2: [],
    choice3: [],
    choice4: [],
    answer: []
  })
  const [stateOpenEnd, setStateOpenEnd] = useState({
  
    question: "",
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
      
})

  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [modal3IsOpen, setModal3IsOpen] = useState(false);
  const [modal4IsOpen, setModal4IsOpen] = useState(false);
  const [modal5IsOpen, setModal5IsOpen] = useState(false);
  //model1 edit quiz
  const setModal1IsOpenToTrue = () => {
    setModal1IsOpen(true)
  }
  const setModal1IsOpenToFalse = () => {
    setModal1IsOpen(false)
  }
  //model2 edit question 
  function setModal2IsOpenToTrue(e) {

    setModal2IsOpen(true);
    setQuestionDocID(
      e.id
    )
    setStateMcq({
      question: e.question,
      choice1: e.choices[0],
      choice2: e.choices[1],
      choice3: e.choices[2],
      choice4: e.choices[3],
      answer: e.answer
    })

  }
  const setModal2IsOpenToFalse = () => {
    setModal2IsOpen(false)
  }
  
  //model3
  const setModal3IsOpenToTrue = () => {
    setModal3IsOpen(true)
  }
  const setModal3IsOpenToFalse = () => {
    setModal3IsOpen(false)
  }
  //model4
  const setModal4IsOpenToTrue = () => {
    setModal4IsOpen(true)
  }
  const setModal4IsOpenToFalse = () => {
    setModal4IsOpen(false)
  }

  //model5 edit question 
  function setModal5IsOpenToTrue(e) {

    setModal5IsOpen(true);
    setQuestionDocID(
      e.id
    )
    setStateOpenEnd({
      question: e.question,
      answer1:e.answers[0],
      answer2:e.answers[1],
      answer3:e.answers[2],
      answer4:e.answers[3],
    })

  }
  const setModal5IsOpenToFalse = () => {
    setModal5IsOpen(false)
  }

  function handleChangeMCQ(e) {
    e.preventDefault();

    const value = e.target.value;
    console.log(value);
    setStateMcq({
      ...stateMcq,
      [e.target.name]: value
    });

  }
  const handleSubmitMCQ = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(questionDocID)
    await updateDoc(doc(fdb, "Questions", questionDocID), {
      question: stateMcq.question,
      choices: [stateMcq.choice1, stateMcq.choice2, stateMcq.choice3, stateMcq.choice4],
      answer: stateMcq.answer
    });
    window.alert('updated!')
    window.location.reload();
  }

  function handleChangeOpenEnded(e) {
    e.preventDefault();

    const value = e.target.value;
    console.log(value);
    setStateOpenEnd({
      ...stateOpenEnd,
      [e.target.name]: value
    });

  }
  const handleSubmitOpenEnded = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(questionDocID)
    await updateDoc(doc(fdb, "OpenEndedQues", questionDocID), {
      question: stateOpenEnd.question,
      answers: [stateOpenEnd.answer1, stateOpenEnd.answer2, stateOpenEnd.answer3, stateOpenEnd.answer4]
    });
    window.alert('updated!')
    window.location.reload()
  }




  // let data = useLoaderData<LoaderData>();
  const data = useLoaderData()[0];
  const data2 = useLoaderData()[1];
  const displaySelected = []
  return (<>
    <div>
      <h1></h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        <h1> MCQ</h1>
        {data && data.map(mcq =>


          <Col>
            <Card border="warning">
              <Card.Title>{mcq.question}</Card.Title>
              <Card.Title>MCQ choices</Card.Title>
              <Card.Text>{mcq.choices[0]}</Card.Text>
              <Card.Text>{mcq.choices[1]}</Card.Text>
              <Card.Text>{mcq.choices[2]}</Card.Text>
              <Card.Text>{mcq.choices[3]}</Card.Text>

              <Card.Text>Answer : {mcq.answer}</Card.Text>
              {/* <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
                      <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text> */}
              <Button type="button" variant="warning" onClick={() => setModal2IsOpenToTrue(mcq)}>Edit question</Button>
            </Card>

          </Col>

        )}
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        <h1> Open endeded</h1>
        {data2 && data2.map(openEnded =>


          <Col>
            <Card border="warning">
              <Card.Title>{openEnded.question}</Card.Title>
              <Card.Title>Answers</Card.Title>
              <Card.Text> {openEnded.answers[0]}</Card.Text>
              <Card.Text> {openEnded.answers[1]}</Card.Text>
              <Card.Text>{openEnded.answers[2]}</Card.Text>
              <Card.Text> {openEnded.answers[3]}</Card.Text>


              {/* <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
                      <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text> */}
              <Button type="button" variant="primary"  onClick={() => setModal5IsOpenToTrue(openEnded)}>Edit question</Button>
            </Card>
          </Col>
        )}
      </Row>


      <button onClick={setModal1IsOpenToTrue} >Edit Quizzz</button>
      <button onClick={setModal3IsOpenToTrue} >ADD MCQ question</button>
      <button onClick={setModal4IsOpenToTrue} >Add open-ended</button>
      {/* edit quiz popup  */}
      <Modal
        isOpen={modal1IsOpen}
        onRequestClose={() => setModal1IsOpen(false)}
        ariaHideApp={false}>
        <button onClick={setModal1IsOpenToFalse}>x</button>
        <EditQuiz/>
      </Modal>
      {/* edit question popup */}
      <Modal
        isOpen={modal2IsOpen}
        onRequestClose={() => setModal2IsOpen(false)}
        ariaHideApp={false}>

        <button onClick={setModal2IsOpenToFalse}>x</button>

        <Form onSubmit={handleSubmitMCQ}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Questionsss</Form.Label>
            <Form.Control
              type="text"
              value={stateMcq.question}
              name="question"
              onChange={handleChangeMCQ} />
            <Form.Text className="text-muted">

            </Form.Text>
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Control
              type="text"
              value={stateMcq.choice1}
              name="choice1"
              onChange={handleChangeMCQ} />
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Control
              type="text"
              value={stateMcq.choice2}
              name="choice2"
              onChange={handleChangeMCQ} />
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Control
              type="text"
              value={stateMcq.choice3}
              name="choice3"
              onChange={handleChangeMCQ} />
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Control
              type="text"
              value={stateMcq.choice4}
              name="choice4"
              onChange={handleChangeMCQ} />
          </Form.Group>
          <Form.Control
            type="text"
            value={stateMcq.answer}
            name="choice4"
            onChange={handleChangeMCQ} />
          <Button variant="primary" type="submit" value={questionDocID}>
            Submit
          </Button>
        </Form>


      </Modal>

      {/* Add MCQ popup */}
      <Modal
        isOpen={modal3IsOpen}
        onRequestClose={() => setModal3IsOpen(false)}
        ariaHideApp={false}>
        <button onClick={setModal3IsOpenToFalse}>x</button>
        <AddMcqPopup />
      </Modal>
      {/* Add open ended  */}
      <Modal
        isOpen={modal4IsOpen}
        onRequestClose={() => setModal4IsOpen(false)}
        ariaHideApp={false}>
        <button onClick={setModal4IsOpenToFalse}>x</button>
        <AddOpenEndedPopup />
      </Modal>
      <Modal
        isOpen={modal5IsOpen}
        onRequestClose={() => setModal5IsOpen(false)}
        ariaHideApp={false}>

        <button onClick={setModal5IsOpenToFalse}>x</button>
        <Form onSubmit={handleSubmitOpenEnded}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        value={stateOpenEnd.question}
                        name="question"
                        onChange={handleChangeOpenEnded} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>



                <Form.Group as={Row} >

                    <Form.Control
                        type="text"
                        value={stateOpenEnd.answer1}
                        name="answer1"
                        onChange={handleChangeOpenEnded} />
                        
               
                </Form.Group>

                <Form.Group as={Row} >
                
                    <Form.Control
                        type="text"
                        value={stateOpenEnd.answer2}
                        name="answer2"
                        onChange={handleChangeOpenEnded} />
                    
                 
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        value={stateOpenEnd.answer3}
                        name="answer3"
                        onChange={handleChangeOpenEnded} />
                      
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        value={stateOpenEnd.answer4}
                        name="answer4"
                        onChange={handleChangeOpenEnded} />


                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Modal>

    </div>
  </>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  let params = useParams();
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.quizDocId}?
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.quizDocId} is not your joke.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);
//   let { quizDocId } = useParams();
//   return (
//     <div className="error-container">{`There was an error loading joke by the id ${quizDocId}. Sorry.`}</div>
//   );
// }