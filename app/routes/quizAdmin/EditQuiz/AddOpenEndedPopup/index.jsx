import { useLoaderData, useNavigate, useLocation  } from "remix";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "../../../../utils/firestore";
import { Link } from "remix";
import { Fragment, useState } from "react";
import { async } from "@firebase/util";


export default  function AddMcqPopup() {
    //eventhandler for form 
    
let navigate = useNavigate();
const location = useLocation();
//console.log(JSON.stringify(location.state.doc) + "ITS over here")
const quizDocID = location.state.doc;
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
        //setQuizName(e.target.value);
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
    }
// Add a new document with a generated id.
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
     // var documentID = docRef.id;
     // setDoc(documentID);
     navigate('/quizAdmin/EditQuiz',{state:{doc:quizDocID}});
    
    console.log("Document written with ID: "+ docRef.id);
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
})
  
  
}

const handleSubmit = (e) => {
    e.preventDefault();
    AddNewQuiz();
    
}


    const [date, setDate] = useState(new Date());
   // console.log("DATE", date);

    const data = useLoaderData();
    return (<>
        <div>
            <h1>ADD open-ended</h1>

            <Form onSubmit={handleSubmit}>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    </>
    );
}