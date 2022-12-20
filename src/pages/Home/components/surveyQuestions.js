import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SurveyContext } from '../../../context/survey'

const SurveyQuestions = () => {
  const [ surveyState, dispatch ] = useContext(SurveyContext)
  const currentQuestion = surveyState.questions[surveyState.currentSurveyIndex]
  const [ selected, setSelected ] = useState('') 
  const [ searchParams, setSearchParams] = useSearchParams()

  useEffect(()=> {
    dispatch({type: "PAGE", payload: Number(searchParams.get("PAGE")) || 0})
  }, [dispatch, searchParams])
  
  const isSelected = (item) => {
    if (setSelected === item) {
      setSelected('');
    } else {
      setSelected(item);
    }
  }
  
  return (
    <>
      <div className="content">
          <h5>{currentQuestion?.id}</h5>
          <h1>{currentQuestion?.question}</h1>
          {currentQuestion?.answers?.map((item, index)=> {
            return (
              <div className={selected === item ? "answer active" : "answer"} key={index} onClick={()=> isSelected(item)}>
                {item}
              </div>
            )       
          })}
      </div>
    </>
  )
}

export default SurveyQuestions