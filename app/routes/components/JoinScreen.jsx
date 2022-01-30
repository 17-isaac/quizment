import { useLoaderData, useNavigate, redirect } from "remix";
function JoinScreen({ start }) {

    const data = useLoaderData();
    console.log(data)
    const quizDetails = data[1]
    console.log(data[1])
    return (

        <div className="join-screen">

            {quizDetails ? (
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
            ) : (
                <div></div>
            )

            }


        </div>


    );
}
export default JoinScreen;
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