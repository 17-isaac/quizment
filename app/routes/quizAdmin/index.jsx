import { useLoaderData, useNavigate} from "remix";
import { collection, getDocs,  updateDoc, doc } from 'firebase/firestore';
import { fdb } from "../../utils/firestore";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import AddQuiz from './AddQuiz';
import Modal from 'react-modal';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Css from '../../styles/quizAdmin'
export function links() {
  return [
    {
      rel: "stylesheet",
      href: Css,
    },
  ];
}

export async function loader() {
  const querySnapshot = await getDocs(collection(fdb, "Quiz"));
  const modifiedEvents = querySnapshot.docs.map((doc) => {

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
const published = "1"
const toHide = "0"
  if(publish==="0"){
    updateDoc(doc(fdb, "Quiz", docID), {
    publish: published
  }).then(() => {
    location.reload(true);
});
  }else if(publish==="1"){
     updateDoc(doc(fdb, "Quiz", docID), {
      publish:toHide
    }).then(() => {
      location.reload(true);
  });
   ;
  }else {
    console.log("error")
  }
 // 
  
}
  const data = useLoaderData();

 
  return (<>
    <div>
      <h1 id="quizAdminTitle" >Quizzes</h1>
      <button className="addNewQuizButton" onClick={setModalIsOpenToTrue} >Add New Quiz </button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data && data.map((quiz,index) => {   
            
        if (quiz.publish==="0") {
          return ( <Col>
            <Card className={"card-"+index} >
              <Card.Title className="card__title">{quiz.quizName}</Card.Title>
              <Card.Text  className="card__details">Total points : {quiz.totalPoints}</Card.Text>
              <Card.Text  className="card__details">Subject : {quiz.subject}</Card.Text>
              <Card.Text  className="card__details">total Marks : {quiz.totalMarks}</Card.Text>
              <Card.Text  className="card__details">Due : {JSON.stringify(quiz.dueDate)}</Card.Text>
              
            <Button className="card__edit" size="sm" type="button" variant="outline-dark" value={quiz.id} onClick={() => setModalIsOpenToTrueQuizEdit(quiz)}>Edit Quiz</Button>
           
           <p class="card__view">
           <button class="card__viewbutton" type="button" variant="warning" value={quiz.id} onClick={bringToEdit}>View Quiz
           </button> 
              </p> 
              <Button className="card__publish" size="sm" variant="success"  onClick={() => publishHideButton(quiz.id,quiz.publish).then(navigate('/quizAdmin'))}>Publish</Button>
            </Card>
          </Col>
           
          )
        } else if (quiz.publish==="1") {
          return (
            <Col>
           <Card className={"card-"+index} >
              <Card.Title className="card__title">{quiz.quizName}</Card.Title>
              <Card.Text  className="card__details">Total points : {quiz.totalPoints}</Card.Text>
              <Card.Text  className="card__details">Subject : {quiz.subject}</Card.Text>
              <Card.Text  className="card__details">Total marks : {quiz.totalMarks}</Card.Text>
              <Card.Text  className="card__details">Due : {JSON.stringify(quiz.dueDate)}</Card.Text>
              
            <Button className="card__edit" size="sm" type="button" variant="outline-dark" value={quiz.id} onClick={() => setModalIsOpenToTrueQuizEdit(quiz)}>Edit Quiz</Button>
           
           <p class="card__view">
           <button class="card__viewbutton" type="button" variant="warning" value={quiz.id} onClick={bringToEdit}>View Quiz
              </button> 
              </p> 
              <Button className="card__publish" size="sm" variant="danger"  onClick={() => publishHideButton(quiz.id,quiz.publish).then(navigate('/quizAdmin'))}>Hide</Button>
         
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

    

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false} 
          className ="formModal">

        <button className="exitModel" onClick={setModalIsOpenToFalse}>x</button>
        <AddQuiz />
      </Modal>

 <Modal
        isOpen={modalIsOpenQuizEdit}
        onRequestClose={() => setModalIsOpenQuizEdit(false)}
        ariaHideApp={false} 
        className ="formModal">

        <button className="exitModel" onClick={setModalIsOpenToFalseQuizEdit}>x</button>
        <p className="formTitle">Edit Quiz</p>
        <Form className="formForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quiz Name</Form.Label>
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
                <Row>
                    <Col>
                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        placeholder={state.dueDate}
                        
                        onChange={handleChange}
                    />
                </Form.Group>
</Col>
<Col>
                <Form.Group>
                    <Form.Label>Duration(Minutes)</Form.Label>
                    <Form.Control 
                    type="number"
                     value={state.duration}
                     name="duration"
                     onChange={handleChange} />
                </Form.Group>
                </Col>
</Row>
<Row>
                    <Col>
                <Form.Group>
                    <Form.Label>Total Mark</Form.Label>
                    <Form.Control
                     type="number" 
                     value={state.totalMarks}
                     name="totalMarks"
                     onChange={handleChange}  />
                </Form.Group>
                </Col>
<Col>
                <Form.Group>
                    <Form.Label>Total Points</Form.Label>
                    <Form.Control 
                    type="number" 
                    value={state.totalPoints}
                    name="totalPoints"
                     onChange={handleChange} />
                </Form.Group>

                </Col>
</Row>
                <Button variant="primary" type="submit">
                    Submittt
                </Button>
            </Form>

        
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