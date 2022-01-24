import { useLoaderData, useNavigate, redirect } from "remix";
import { collection, getDocs,  updateDoc, doc } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import AddQuiz from './AddQuiz';
import Modal from 'react-modal';
import { Link } from "remix";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { async } from "@firebase/util";
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
  const [state, setState] = useState({
    quizName: "",
    subject: "",
    totalPoints:"",
    totalMarks:"",
    level:"",
    dueDate:"",
    duration:"",
    publish:""
  })
    const [date, setDate] = useState(new Date());

  const [quizDocID, setQuizDocID] = useState("")
  let navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenQuizEdit, setModalIsOpenQuizEdit] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const setModalIsOpenToTrueQuizEdit = (e) => {
    setModalIsOpenQuizEdit(true)
    console.log(e)
    setQuizDocID(
      e.id
    )
    setState({
      quizName: e.quizName,
      subject: e.subject,
      totalPoints:e.totalPoints,
      totalMarks:e.totalMarks,
      level:e.level,
      dueDate:e.dueDate,
      duration:e.duration,
      publish:e.publish
    })
  }
  const setModalIsOpenToFalseQuizEdit = () => {
    setModalIsOpenQuizEdit(false)
  }

  function bringToEdit(e) {

    const value = e.target.value;
    console.log("quiz selected!!!" + value);
    let quiz = {
      docId:value
    }
    navigate(`/quizAdmin/${quiz.docId}`, { state: { doc: value } });
    
  }
  function handleChange (e){
    e.preventDefault();
    //setQuizName(e.target.value);
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
}
const handleSubmit = async (e) => {
  e.preventDefault();
  await updateDoc(doc(fdb, "Quiz", quizDocID), {
    quizName: state.quizName,
    subject: state.subject,
    totalPoints:state.totalPoints,
    totalMarks:state.totalMarks,
    level:state.level,
    dueDate:state.dueDate,
    duration:state.duration
  });
  window.alert('updated!')
  window.location.reload();
  
}
const publishHideButton = (docID, publish) => {
  console.log(docID + publish)
const published = "1"
const toHide = "0"
  if(publish==="0"){
    updateDoc(doc(fdb, "Quiz", docID), {
    publish: published
  })

  }else if(publish==="1"){
     updateDoc(doc(fdb, "Quiz", docID), {
      publish:toHide
    })
   ;
  
  }else {
    console.log("error")
  }
  
  
}
  const data = useLoaderData();

 
  return (<>
    <div>
      <h1></h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {data && data.map(quiz => {   
            
        if (quiz.publish==="0") {
          return ( <Col>
            <Card border="warning">
              <Card.Title>{quiz.quizName}</Card.Title>
              <Card.Text>Points : {quiz.totalPoints}</Card.Text>
              <Card.Text>Subject : {quiz.subject}</Card.Text>
              <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
              <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>
              <button type="button" variant="warning" value={quiz.id} onClick={bringToEdit}>View Quiz</button>
            <Button type="button" variant="primary" value={quiz.id} onClick={() => setModalIsOpenToTrueQuizEdit(quiz)}>Edit Quiz</Button>
            <Button size="sm" variant="success"  onClick={() => publishHideButton(quiz.id,quiz.publish)}>Publish</Button>
           
            </Card>
          </Col>
           
          )
        } else if (quiz.publish==="1") {
          return (
            <Col>
            <Card border="warning">
            <Card.Title>{quiz.quizName}</Card.Title>
            <Card.Text>Points : {quiz.totalPoints}</Card.Text>
            <Card.Text>Subject : {quiz.subject}</Card.Text>
            <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
            <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>
            <button type="button" variant="warning" value={quiz.id} onClick={bringToEdit}>View Quiz</button>
          <Button type="button" variant="primary" value={quiz.id} onClick={() => setModalIsOpenToTrueQuizEdit(quiz)}>Edit Quiz</Button>
          <Button size="sm"  variant="danger" onClick={() => publishHideButton(quiz.id, quiz.publish)}>Hide</Button>
         
          </Card>
        </Col>
          )
        } else {
          return (
            <div>catch all</div>
          )
        }
      


    
 } )}
      </Row>

      <button onClick={setModalIsOpenToTrue} >Add New Quiz </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false} >

        <button onClick={setModalIsOpenToFalse}>x</button>
        <AddQuiz />
      </Modal>

 <Modal
        isOpen={modalIsOpenQuizEdit}
        onRequestClose={() => setModalIsOpenQuizEdit(false)}
        ariaHideApp={false} >

        <button onClick={setModalIsOpenToFalseQuizEdit}>x</button>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edit Form</Form.Label>
                    <Form.Control 
                    type="text"
                     value={state.quizName}
                     name="quizName"
                    onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        
                    </Form.Text>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select aria-label="Default select example" name="subject"
          defaultValue={state.subject}
          onChange={handleChange}>
                        <option>Select Quiz subject</option>
                        <option value="Math">Math</option>
                        <option value="Biology">Biology</option>
                        <option value="Phyics">Physics</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Secondary 1"
                            name="level"
                            type='radio'
                            id={`inline-radio-1`}
                            value= "1"
                            checked={state.level === "1"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Secondary 2"
                            name="level"
                            type='radio'
                            id={`inline-radio-2`}
                            value ="2"
                            checked={state.level === "2"}
                            onChange={handleChange}
                        />

                    </div>

                </Form.Group>
                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        placeholder={state.dueDate}
                        
                        onChange={handleChange}
                    />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Duration(Minutes)</Form.Label>
                    <Form.Control 
                    type="number"
                     value={state.duration}
                     name="duration"
                     onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Mark</Form.Label>
                    <Form.Control
                     type="number" 
                     value={state.totalMarks}
                     name="totalMarks"
                     onChange={handleChange}  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Points</Form.Label>
                    <Form.Control 
                    type="number" 
                    value={state.totalPoints}
                    name="totalPoints"
                     onChange={handleChange} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submittt
                </Button>
            </Form>

        
      </Modal>
    </div>
  </>
  );
}