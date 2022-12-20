import React, { useContext, useEffect, useRef, useState } from "react";
import { SurveyContext } from "../../../context/survey";
import "./styles.scss";
import SurveyQuestions from "./surveyQuestions";
import { VscDebugRestart } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";


const useMyTimer = ({time}) => {
    const [ counter, setCounter ] = useState(time)
    const savedCounter = useRef()
    useEffect(()=> {
        savedCounter.current = counter
    }, [counter])
        useEffect(()=> {
            const interval = setInterval(()=> {
                if(savedCounter.current === 0) {
                    setCounter(10)
                } else {
                    setCounter((prev)=> {
                       return prev - 1
                    })
                }
            }, 1000)
            return ()=> clearInterval(interval)
        }, [])
        return {counter, setCounter}
    
}

const SurveyContent = () => {
  const [surveyState, dispatch] = useContext(SurveyContext);
  const [searchParams, setSearchParams] = useSearchParams()

  const {counter, setCounter} = useMyTimer({time:10})
  useEffect(()=> {
    if(counter === 0) {
        setTimeout(()=> {
            dispatch({type: "NEXT_SURVEY"})
            setSearchParams({PAGE: Number(surveyState.currentSurveyIndex)+1})
        }, 1000)
    }  
  }, [counter, dispatch, setSearchParams, surveyState.currentSurveyIndex])

  let progressBar = []
  for(let i = 0; i < Number(searchParams.get("PAGE"))+1; i++) {
    progressBar.push(
        <div className="progress-bar"></div>
    )
  }

  return (
    <>
      {!surveyState.showResult ? (
        <>
          <div className="progress-content">
            {progressBar}
          </div>
          <div className="d-flex justify-content-end align-items-center mt-3 timer">
            Time left : {counter} sec
          </div>
          <SurveyQuestions />
          <div className="button">
            <button onClick={() => {
                dispatch({ type: "NEXT_SURVEY" })
                setCounter(10)
                setSearchParams({PAGE: Number(surveyState.currentSurveyIndex)+1})
                }}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="endsurvey">
          <h1>Thank you for completing this survey</h1>
          <button onClick={() => {
            dispatch({ type: "RESTART" })
            setSearchParams({PAGE: 0})
            }}>
            <VscDebugRestart className="icon" />
            Restart the survey
          </button>
        </div>
      )}
    </>
  );
};

export default SurveyContent;
