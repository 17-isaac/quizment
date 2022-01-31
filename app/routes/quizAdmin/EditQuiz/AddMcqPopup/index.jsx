import { useNavigate, useLocation } from "remix";
import { collection, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form } from "react-bootstrap";
import { fdb } from "~/utils/firebase";
import { useState } from "react";
import Css from '../../../../styles/quizAdmin'
export function links() {
  return [
    {
      rel: "stylesheet",
      href: Css,
    },
  ];
}


export default function AddMcqPopup() {
    //eventhandler for form 

    let navigate = useNavigate();
    const location = useLocation();
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
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
function handleFileUpload(e){
    e.preventDefault();
    const newUrl = e.target.files[0]
    setUrl(newUrl)
   
}

    function AddNewQues() {
        if(url==""){
  const docRef = addDoc(collection(fdb, "Questions"), {
            question: state.question,
            choices: [state.choice1, state.choice2, state.choice3, state.choice4],
            answer: state.answer,
            quizDocID: quizDocID

        }).then(function (docRef) {
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
            /** @type {any} */
            const metadata = {
                contentType: file.type,
            };
            uploadBytes(storageRef, file, metadata);

            getDownloadURL(storageRef).then((downloadURL) => {

               
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

    return (<>
        <div>
        <p className="formTitle">Add MCQ Question</p>

            <Form  className="formForm" onSubmit={handleSubmit}>
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
                <Form.Label>Multiple Choices</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter MCQ choice"
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
                    <Form.Label>Upload image</Form.Label>
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