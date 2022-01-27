import { useLoaderData, useNavigate, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
        quizDocID: ""
    })
    const [doc, setDoc] = useState("");
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
        if(state.url==""){
        const docRef = addDoc(collection(fdb, "OpenEndedQues"), {
            question: state.question,
            answers:[state.answer1,state.answer2,state.answer3,state.answer4] ,
            type:2,
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

               
                const docRef = addDoc(collection(fdb, "OpenEndedQues"), {
                    question: state.question,
                    answers:[state.answer1,state.answer2,state.answer3,state.answer4] ,
                    type:2,
                    img_url:downloadURL,
                    quizDocID: quizDocID
        
                }).then(function (docRef) {
                    // var documentID = docRef.id;
                    // setDoc(documentID);
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
            <h1>Enter New Open-ended question</h1>

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
                        name="answer1"
                        onChange={handleChange} />
                        
               
                </Form.Group>

                <Form.Group as={Row} >
                
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="answer2"
                        onChange={handleChange} />
                    
                 
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="answer3"
                        onChange={handleChange} />
                      
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
                        name="answer4"
                        onChange={handleChange} />


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