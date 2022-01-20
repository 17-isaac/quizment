//Edit question modal popup componet
import { useLoaderData, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
// import { collection, addDoc } from "firebase/firestore"; 
// import Button from 'react-bootstrap/Button';
// import { Form } from 'react-bootstrap'
// //import { fdb } from "../../../utils/firestore";
// import { Link } from "remix";
// import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

//import AddQuesPopup from '';
//import AddMcqPopup from '';
import Modal from 'react-modal';
import { Fragment, useState } from "react";
import { async } from "@firebase/util";


export default  function EditQuizPopup() {
    


    //eventhandler for form 
    const location = useLocation();
console.log(JSON.stringify(location.state.doc) + "ITS over here")

    const [date, setDate] = useState(new Date());
   // console.log("DATE", date);

    const data = useLoaderData();
    return (<>
          <div>
      <h1>success quiz</h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {/* {data && data.map(quiz =>


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
        )} */}
      </Row>

      {/* <button >Edit Quiz</button> */}

      


    </div>
    </>
    );
}