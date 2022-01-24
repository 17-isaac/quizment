import { useLoaderData, useNavigate } from "remix";
import { useState, useEffect } from "react";
//import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import { fdb } from "../../utils/firestore";
import { Link } from "remix";
import { async } from "@firebase/util";
import main from './index'

 
    
export default  function quizPopup() {
    //eventhandler for form 

//    setSelectedQuiz(props.selectedQuiz)
  
   
    return (<>
        <div>
            <h1>INtrusctions</h1>

           
       
        </div>

    </>
    );
}