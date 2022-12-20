import React from 'react'
import SurveyContent from './components/surveyContent'
import './styles.scss'

const Home = () => {
  return (
    <div className='home'>
        <div className="card">
            <SurveyContent />
        </div>
    </div>
  )
}

export default Home