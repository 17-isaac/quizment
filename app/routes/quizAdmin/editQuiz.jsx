import { Link, useLoaderData, useCatch, redirect, useParams } from "remix";
import { getFirestore, doc, getDoc, getDocs, Firestore } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "../../utils/firestore";

import { Fragment, useState } from "react";

export async function loader() {
 
    console.log(JSON.stringify(data[0].quizDocID) + "THIS IS PARAAM");
    const docRef = doc(fdb, "Quiz", "quiz");
    const docSnap = await getDoc(docRef);
    console.log("Document data:", docSnap.data());
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  return docSnap;
 console.log(data+"this one")
  
  };
  
export default  function editQuiz() {
 
    const [state, setState] = useState({
        quizName: "",
        subject: "",
        totalPoints:"",
        totalMarks:"",
        level:"",
        dueDate:"",
        duration:""
      })
      const [doc, setDoc]= useState ("");

    function handleChange (e){
        e.preventDefault();
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
    }

  


const handleSubmit = (e) => {
    e.preventDefault();
}
const [date, setDate] = useState(new Date());
  
    return (<>
        <div>
            <h1></h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quiz Name</Form.Label>
                    <Form.Control 
                    type="text"
                     placeholder="Enter Quiz Name"
                     name="quizName"
                    onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        This is the name of youre soon created quiz
                    </Form.Text>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select aria-label="Default select example" name="subject"
          value={state.subject}
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
                        placeholder="select due date"
                       
                        onChange={handleChange}
                    />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Duration(Minutes)</Form.Label>
                    <Form.Control 
                    type="number"
                     placeholder="Enter Minutes"
                     name="duration"
                     onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Mark</Form.Label>
                    <Form.Control
                     type="number" 
                     placeholder="Enter total Marks" 
                     name="totalMarks"
                     onChange={handleChange}  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Points</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter total Points" 
                    name="totalPoints"
                     onChange={handleChange} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submittt
                </Button>
            </Form>

        </div>
    </>
    );
}