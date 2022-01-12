//import { initializeApp } from 'firebase/app';
import { useLoaderData } from "remix";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import { fdb } from "~/utils/firestore";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';


// Get a list of quizes from your database
export async function loader() {
    const quizCol = collection(fdb, 'Quiz');
    const quizSnapshot = await getDocs(quizCol);
    const quizList = quizSnapshot.docs.map(doc => doc.data());
 
    return quizList;
  

};


export default function quizAdmin() {


    const data = useLoaderData();
    return (<>
        <div>
        <h1></h1> 
       {console.log("data OBER HERE" + JSON.stringify(data))}
          <Row xs={1} md={2} lg={3} className="g-4">
            {data && data.map(quiz =>
           
              <Col>
                <Card border="warning">
                 
               
                    <Card.Title>{quiz.quizName}</Card.Title>
                    <Card.Text>Points : {quiz.totalPoints}</Card.Text>
                    <Card.Text>Subject : {quiz.subject}</Card.Text>
                    <Card.Text>total Marks : {quiz.totalMarks}</Card.Text>
                    <Card.Text>Due : {JSON.stringify(quiz.dueDate)}</Card.Text>
                  
                </Card>
              </Col>
            )}
          </Row>
        </div>
        </>
    );
}