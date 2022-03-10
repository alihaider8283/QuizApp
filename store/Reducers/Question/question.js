import {  FetchingQuestions, FetchingQuestionsFailure, FetchingQuestionsSuccess, QuestionChanged } from '../../Actions/Question/actionTypes';

const fetchingQuestionState = {
     Fetching: false, 
     data: null,
     error: null ,
     selectedQuestion: null
}

const questionReducer = (state=fetchingQuestionState, action) =>
{
    switch(action.type){
        case FetchingQuestions:
            return {
                ...state,
                Fetching: action.payload.Fetching
            }
        case FetchingQuestionsSuccess:
            return {
                ...state,
                Fetching: action.payload.Fetching,
                data: action.payload.FetchingResponse,
                error: action.payload.FetchingError
            }
        case FetchingQuestionsFailure:
            return {
               ...state,
               Fetching: action.payload.Fetching,
               data: action.payload.FetchingResponse,
               error: action.payload.FetchingError
            }
        case QuestionChanged: 
            return {
                ...state,
                selectedQuestion: action.payload.questionChanged
            }     
        default:
            return state            
    }
}

export default questionReducer