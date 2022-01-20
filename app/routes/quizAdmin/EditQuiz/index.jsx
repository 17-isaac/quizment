import { useLoaderData, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "../../../utils/firestore";
import { Link } from "remix";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import EditQuizPopup from './EditQuesPopup';
import EditQuesPopup from './EditQuesPopup';
import AddMcqPopup from './AddMcqPopup';
import AddOpenEndedPopup from './AddOpenEndedPopup'

//import AddQuesPopup from '';
//import AddMcqPopup from '';
import Modal from 'react-modal';
import { Fragment, useState } from "react";
import { async } from "@firebase/util";



export default function EditQuiz() {
    const [quizQues, setQuizQues] = useState('');

function currentQuiz(callback){
      const location = useLocation();
   //  console.log(JSON.stringify(location.state.doc) + "ITS over here");
     const quizID= location.state.doc;
     callback(quizID);
}
currentQuiz(async function (quizID){
  //  console.log("this is the quiz ID" +quizID)
    
    const q =  query(collection(fdb, "Questions"), where("quizDocID", "==",quizID));
    const querySnapshot = await getDocs(q);
    const modifiedEvents = querySnapshot.docs.map((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
      const eventData = doc.data()
      eventData.id = doc.id
      return eventData
    });
 //   console.log("modified events" + JSON.stringify(modifiedEvents))
    setQuizQues(modifiedEvents) ;

})





    
  
    const [modal1IsOpen, setModal1IsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const [modal3IsOpen, setModal3IsOpen] = useState(false);
    const [modal4IsOpen, setModal4IsOpen] = useState(false);
    //model1 edit quiz
    const setModal1IsOpenToTrue = () => {
        setModal1IsOpen(true)
    }
    const setModal1IsOpenToFalse = () => {
        setModal1IsOpen(false)
    }
    //model2 edit question
    const setModal2IsOpenToTrue = () => {
        setModal2IsOpen(true)
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


    //eventhandler for form 
    // const location = useLocation();
    // console.log(JSON.stringify(location.state.doc) + "ITS over here")

    const [date, setDate] = useState(new Date());
    // console.log("DATE", date);

    const data = quizQues;
    return (<>
        <div>
            <h1></h1>

            <Row xs={1} md={2} lg={3} className="g-4">
                {data && data.map(quiz =>


                    <Col>
                        <Card border="warning">
                            <Card.Title>{quiz.question}</Card.Title>
                            <Card.Text>choices: {quiz.choices[0]}</Card.Text>
                            <Card.Text>choices: {quiz.choices[1]}</Card.Text>
                            <Card.Text>choices: {quiz.choices[2]}</Card.Text>
                            <Card.Text>choices: {quiz.choices[3]}</Card.Text>
                            
                            <Card.Text>Answer : {quiz.answer}</Card.Text>
                            {/* <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
                            <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text> */}
                            <button type="button" variant="primary" value={quiz.id} onClick={setModal2IsOpenToTrue}>Edit question</button>
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
                <EditQuizPopup />
            </Modal>
            {/* edit question popup */}
            <Modal
                isOpen={modal2IsOpen}
                onRequestClose={() => setModal2IsOpen(false)}
                ariaHideApp={false}>
                <button onClick={setModal2IsOpenToFalse}>x</button>
                <EditQuesPopup />
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


        </div>
    </>
    );
}