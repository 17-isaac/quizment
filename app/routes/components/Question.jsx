import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom"


function Question({ question, totalQuestion, currentQuestion, setAnswer }) {
    const [selectOption, setSelectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);
    const [timerOrNext, setTimerOrNext] = useState()

    function gotoNextQuestion() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        flushSync(() => {
            setAnswer(selectOption);
            console.log(selectOption + "IT IS FLUSHED")
        });
        setSelectedOption(null);
    }
    function handleChange(e) {
        const value = e.target.value;
        console.log(value + "this is the value in the input box")
        setSelectedOption(value)
    }


    useEffect(() => {
        progressBar.current.classList.remove("active");
        setTimeout(() => {
            progressBar.current.classList.add("active");
            console.log("is it timed out")
        }, 0);
        timer.current = setTimeout(gotoNextQuestion, 20 * 1000); //20 seconds



    }, [question]);
    if (question.choices) {
        return (
            
            <div className="question" >
                <div className="progress-bar" ref={progressBar}></div>
                <div className="question-count">
                    <b>{currentQuestion}</b>
                    of
                    <b>{totalQuestion}</b>
                </div>
                <div className="main">
                    <div className="title">
                        <span>Question:</span>
                        <p>{question.question}</p>
                    </div>
                    <div>
                        {(question.img_url == "") ? (
                            <div></div>
                        ) : (
                            <img src={question.img_url} width="400" height="100%" alt="Image"></img>
                        )}</div>
                    <div className="option" >

                        {
                            question.choices.map((option, index) => {
                                return (
                                    <div
                                        className={index == selectOption ? "option active" : "option"}
                                        key={index}
                                        onClick={() => setSelectedOption(index)}>
                                        {option}
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="control">
                    <button onClick={gotoNextQuestion}>Next</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="question" >
                <div className="progress-bar" ref={progressBar}></div>
                <div className="question-count">
                    <b>{currentQuestion}</b>
                    of
                    <b>{totalQuestion}</b>
                </div>
                <div className="main">
                    <div className="title">
                        <span>Question:</span>
                        <p>{question.question}</p>

                    </div>
                    <div>
                        {(question.img_url == "") ? (
                            <div></div>
                        ) : (
                            <img src={question.img_url} width="400" height="100%" alt="Image"></img>
                        )}</div>
                    <div className="" >
                        <input onChange={handleChange}></input>
                    </div>

                </div>
                <div className="control">
                    <button onClick={gotoNextQuestion}>Next</button>
                </div>
            </div>
        )
    }

}
export default Question;
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