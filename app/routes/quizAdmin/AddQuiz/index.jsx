//import { initializeApp } from 'firebase/app';
import { useLoaderData } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "../../../utils/firestore";

import { Fragment, useState } from "react";


export default function AddQuiz() {
// Add a new document with a generated id.
const docRef = await addDoc(collection(fdb, "Quiz"), {
    name: "Tokyo",
    country: "Japan"
  });
  console.log("Document written with ID: ", docRef.id);



    const [date, setDate] = useState(new Date());
    console.log("DATE", date);

    const data = useLoaderData();
    return (<>
        <div>
            <h1></h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quiz Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        This is the name of youre soon created quiz
                    </Form.Text>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select Quiz subject</option>
                        <option value="1">Math</option>
                        <option value="2">Biology</option>
                        <option value="3">Physics</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                            inline
                            label="Secondary 1"
                            name="group1"
                            type='radio'
                            id={`inline-radio-1`}
                        />
                        <Form.Check
                            inline
                            label="Secondary 2"
                            name="group1"
                            type='radio'
                            id={`inline-radio-2`}
                        />

                    </div>

                </Form.Group>
                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="select due date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Duration(Minutes)</Form.Label>
                    <Form.Control type="number" placeholder="Enter Minutes" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Mark</Form.Label>
                    <Form.Control type="number" placeholder="Enter total Marks" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Points</Form.Label>
                    <Form.Control type="number" placeholder="Enter total Points" />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    </>
    );
}