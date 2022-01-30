import { useLoaderData, useNavigate, useLocation } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Col, Row, Form } from "react-bootstrap";
import { fdb } from "../../../../utils/firestore";
import { Link } from "remix";
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
    }
    function handleFileUpload(e){
        e.preventDefault();
        const newUrl = e.target.files[0]
        setUrl(newUrl)
       
    }
    
    function AddNewQues() {
        if(state.url==""){
        const docRef = addDoc(collection(fdb, "OpenEndedQues"), {
            question: state.question,
            answers:[state.answer1,state.answer2,state.answer3,state.answer4] ,
            type:2,
            quizDocID: quizDocID

        }).then(function (docRef) {
            navigate(`/quizAdmin/${quiz.docId}`, { state: { doc: quizDocID } });
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
        }else{

    
            const storage = getStorage();
            const storageRef = ref(storage, 'img/' + url.name);
            const file = url;

            // Create file metadata including the content type
            /** @type {any} */
            const metadata = {
                contentType: file.type,
            };
            uploadBytes(storageRef, file, metadata);

            getDownloadURL(storageRef).then((downloadURL) => {

                const docRef = addDoc(collection(fdb, "OpenEndedQues"), {
                    question: state.question,
                    answers:[state.answer1,state.answer2,state.answer3,state.answer4] ,
                    type:2,
                    img_url:downloadURL,
                    quizDocID: quizDocID
        
                }).then(function (docRef) {
                    navigate(`/quizAdmin/${quizDocID}`, { state: { doc: quizDocID } });
        
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

    const data = useLoaderData();
    return (<>
        <div>
        <p className="formTitle">Add Open-ended Questions</p>

        <Form className="formForm"  onSubmit={handleSubmit}>
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
                <Form.Label>Enter key words for open-ended Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter answer choice"
                        name="answer1"
                        onChange={handleChange} />
                        
               
                </Form.Group>

                <Form.Group as={Row} >
                
                    <Form.Control
                        type="text"
                        placeholder="Enter Key Word"
                        name="answer2"
                        onChange={handleChange} />
                    
                 
                </Form.Group>


                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter Key Word"
                        name="answer3"
                        onChange={handleChange} />
                      
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Control
                        type="text"
                        placeholder="Enter Key Word"
                        name="answer4"
                        onChange={handleChange} />


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