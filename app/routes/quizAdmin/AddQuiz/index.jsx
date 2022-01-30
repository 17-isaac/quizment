import { useLoaderData, useNavigate } from "remix";
import { collection, addDoc } from "firebase/firestore"; 
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "~/utils/firebase";
import {useState } from "react";


export default  function AddQuiz() {
    
let navigate = useNavigate();
    const [state, setState] = useState({
        quizName: "",
        subject: "",
        totalPoints:"",
        totalMarks:"",
        level:"",
        dueDate:"",
        duration:""
      })

    function handleChange (e){
        e.preventDefault();
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
    }


 function AddNewQuiz(){
    const docRef =  addDoc(collection(fdb, "Quiz"), {
        quizName : state.quizName ,
        subject : state.subject,
        totalPoints: state.totalPoints,
        totalMarks: state.totalMarks,
        level: state.level,
        dueDate : state.dueDate,
        duration:state.duration,
        publish:"0"
  }).then(function(docRef) {
     navigate(`/quizAdmin/${quiz.docId}`,{state:{doc:docRef.id}});
    
  
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
})
  
  
}

const handleSubmit = (e) => {
    e.preventDefault();
    AddNewQuiz();
}

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
                        placeholder="Select Date"
                        
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