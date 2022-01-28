import { useLoaderData, useNavigate, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        
        answer: "",
        quizDocID: ""
    })
    const [url, setUrl] = useState("");

    function handleChange(e) {
        e.preventDefault();
        //setQuizName(e.target.value);
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        // console.log(value + "this is the value")
    }
function handleFileUpload(e){
    e.preventDefault();
    const newUrl = e.target.files[0]
 console.log(newUrl)
    setUrl(newUrl)
   
}

    // Add a new document with a generated id.
    function AddNewQues() {
        if(url==""){
  const docRef = addDoc(collection(fdb, "Questions"), {
            question: state.question,
            choices: [state.choice1, state.choice2, state.choice3, state.choice4],
            answer: state.answer,
            quizDocID: quizDocID

        }).then(function (docRef) {
            // var documentID = docRef.id;
            // setDoc(documentID);
            navigate(`/quizAdmin/${quiz.docId}`, { state: { doc: quizDocID } });

            console.log("Document written with ID: " + docRef.id);

        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
        }else{
            console.log(JSON.stringify(url) +"this is the current state for url")
            const storage = getStorage();
            const storageRef = ref(storage, 'img/' + url.name);
            const file = url;
            console.log(file + "this is the file" + "this is the file type " + file.type)
            // Create file metadata including the content type
            /** @type {any} */
            const metadata = {
                contentType: file.type,
            };
            uploadBytes(storageRef, file, metadata);

            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);

               
                const docRef = addDoc(collection(fdb, "Questions"), {
                    question: state.question,
                    choices: [state.choice1, state.choice2, state.choice3, state.choice4],
                    answer: state.answer,
                    quizDocID: quizDocID,
                    img_url: downloadURL
        
                }).then(function (docRef) {
                 
                    navigate(`/quizAdmin/${quizDocID}`, { state: { doc: quizDocID } });
        
                    console.log("Document written with ID: " + docRef.id);
        
                })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    })

              
            })

        }
      


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
                        name="choice1"
                        onChange={handleChange} />

                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            label=""
                            name="answer"
                            type='radio'
                            id={`inline-radio-1`}
                            value="0"
                            checked={state.answer === "0"}
                            onChange={handleChange}
                        /></div>
                </Form.Group>

                <Form.Group as={Row} >

                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice2"
                        onChange={handleChange} />
                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            name="answer"
                            type='radio'
                            id={`inline-radio-2`}
                            value="1"
                            checked={state.answer === "1"}
                            onChange={handleChange}
                        /></div>
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice3"
                        onChange={handleChange} />
                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            name="answer"
                            type='radio'
                            id={`inline-radio-3`}
                            value="2"
                            checked={state.answer === "2"}
                            onChange={handleChange}
                        /></div>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="choice4"
                        onChange={handleChange} />
                    <div key={`inline-radio`}>
                        <Form.Check
                            inline
                            name="answer"
                            type='radio'
                            id={`inline-radio-4`}
                            value="3"
                            checked={state.answer === "3"}
                            onChange={handleChange}
                        /></div>

                </Form.Group>

                <Form.Group controlId="imageUpload">
                    <Form.Label>Upload image here</Form.Label>
                    <Form.Control
                        type="file"
                         class="form-control-file"
                        placeholder="Enter New Question"
                        name="img_url"
                        onChange={handleFileUpload} />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    </>
    );
}