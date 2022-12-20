import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import { SurveyProvider } from './context/survey';

function App() {
  return (
    <SurveyProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </SurveyProvider>
  );
}

export default App;
