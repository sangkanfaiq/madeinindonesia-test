import { createContext, useReducer } from "react";
import { questions } from "../api/data";

const initialState = {
    questions,
    currentSurveyIndex: 0,
    showResult: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case "NEXT_SURVEY": {
            const showResult = state.currentSurveyIndex === state.questions.length - 1;
            const currentSurveyIndex = showResult ? state.currentSurveyIndex : state.currentSurveyIndex +1
            return {
                ...state,
                currentSurveyIndex,
                showResult,
            };
        }
        case "RESTART": {
            return initialState;
        }
        case "PAGE": {
            const currentSurveyIndex = action.payload
            const showResult = state.currentSurveyIndex === state.questions.length - 1;
            return {
                ...state,
                currentSurveyIndex,
                showResult
            }
        }
        default:
            return state;
    }
}

export const SurveyContext = createContext()
export const SurveyProvider = ({children}) => {
    const value = useReducer(reducer, initialState)
    return (
        <SurveyContext.Provider value={value}>
            {children}
        </SurveyContext.Provider>
    )
}