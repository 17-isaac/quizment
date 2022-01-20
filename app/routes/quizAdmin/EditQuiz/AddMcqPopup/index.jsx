import { useLoaderData, useNavigate, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';

import { Col, Row, Form } from "react-bootstrap";
import { fdb } from "../../../../utils/firestore";
import { Link } from "remix";
import { Fragment, useState } from "react";
import { async } from "@firebase/util";


export default function AddMcqPopup() {
    //eventhandler for form 

    let navigate = useNavigate();
    const location = useLocation();
    //console.log(JSON.stringify(location.state.doc) + "ITS over here")
    const quizDocID = location.state.doc;
    const [state, setState] = useState({
        question: "",
        choices: [],
        answer: "",
        quizDocID: ""
    })
    const [doc, setDoc] = useState("");

    function handleChange(e) {
        e.preventDefault();
        //setQuizName(e.target.value);
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        console.log(value + "this is the value")
    }
    // Add a new document with a generated id.
    function AddNewQues() {
        const docRef = addDoc(collection(fdb, "Questions"), {
            question: state.question,
            choices: state.choices,
            answer: state.answer,
            quizDocID: quizDocID

        }).then(function (docRef) {
            // var documentID = docRef.id;
            // setDoc(documentID);
            navigate('/quizAdmin/EditQuiz', { state: { doc: quizDocID } });

            console.log("Document written with ID: " + docRef.id);

        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AddNewQues();

    }


    const [date, setDate] = useState(new Date());
    // console.log("DATE", date);

    const data = useLoaderData();
    return (<>
        <div>
            <h1></h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter New Question"
                        name="question"
                        onChange={handleChange} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>



                <Form.Group as={Row} >

                    <Form.Control
                        type="text"
                        placeholder="enter answer choice"
                        name="choice"
                        onChange={handleChange} />
                        
                <div key={`inline-radio`}>
                    <Form.Check
                        inline
                        label=""
                        name="answer"
                        type='radio'
                        id={`inline-radio-1`}
                        value="1"
                        checked={state.answer === "1"}
                        onChange={handleChange}
                    /></div>
                </Form.Group>

                <Form.Group as={Row} >
                
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice"
                        onChange={handleChange} />
                        <div key={`inline-radio`}>
                    <Form.Check
                        inline
                        name="answer"
                        type='radio'
                        id={`inline-radio-2`}
                        value="2"
                        checked={state.answer === "2"}
                        onChange={handleChange}
                    /></div>
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice"
                        onChange={handleChange} />
                        <div key={`inline-radio`}>
                    <Form.Check
                        inline
                        name="answer"
                        type='radio'
                        id={`inline-radio-3`}
                        value="3"
                        checked={state.answer === "3"}
                        onChange={handleChange}
                    /></div>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice"
                        onChange={handleChange} />
<div key={`inline-radio`}>
                    <Form.Check
                        inline
                        name="answer"
                        type='radio'
                        id={`inline-radio-4`}
                        value="4"
                        checked={state.answer === "4"}
                        onChange={handleChange}
                    /></div>

                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    </>
    );
}