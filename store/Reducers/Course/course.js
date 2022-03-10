import {FetchingCourses, FetchingSuccess, FetchingFailure} from '../../Actions/Courses/actionTypes';

const CoursesFetchingState = {
    Fetching: false,
    data: null,
    error: null
}

const courseReducer = (state=CoursesFetchingState, action) => 
{
     switch(action.type){
         case FetchingCourses:
             return {
                 ...state,
                 Fetching: action.payload.Fetching
             }
         case FetchingSuccess:
             return {
                 ...state,
                 Fetching: action.payload.Fetching,
                 data: action.payload.FetchingResponse,
                 error: action.payload.FetchingError
             }
         case FetchingFailure:
             return {
                ...state,
                Fetching: action.payload.Fetching,
                data: action.payload.FetchingResponse,
                error: action.payload.FetchingError
             }
         default:
             return state            
     }
}

export default courseReducer