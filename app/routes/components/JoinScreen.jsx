import { useLoaderData, useNavigate, redirect } from "remix";
function JoinScreen({start}){

    const data = useLoaderData();
    console.log(data)
    const quizDetails = data[1]
    console.log(data[1])
   
    return (
        
        <div className="join-screen">
         
           
{quizDetails? (
 <div>
      <h2>{quizDetails.quizName}</h2>
            <p>{quizDetails.subject}</p>
            <p>Total Mark : {quizDetails.totalMarks}</p>
            <p>Total Points: {quizDetails.totalPoints}</p>
            <p>Seondary {quizDetails.level}</p>
            <p>instructions</p>
            <p>Each Question will take 30 seconds each so be quick</p>
            <p>you will not be able to navigate back after 30 seconds is up and or by clicking the next button</p>
            <button onClick={start}>Start</button>
            </div>
):(
    <div></div>
)
    
}
           
            
        </div>

        
    );
    }
    export default JoinScreen;