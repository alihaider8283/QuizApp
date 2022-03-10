import {FetchingCourseCategories, FetchingCourseCategorySuccess, FetchingCourseCategoryFailure} from '../../Actions/CourseCategories/actionTypes';

const CourseCategoryFetchingState = {
    Fetching: false,
    data: null,
    error: null
}

const courseCategoryReducer = (state=CourseCategoryFetchingState, action) => 
{
     switch(action.type){
         case FetchingCourseCategories:
             return {
                 ...state,
                 Fetching: action.payload.Fetching
             }
         case FetchingCourseCategorySuccess:
             console.log("course category reducer success : ");
             return {
                 ...state,
                 Fetching: action.payload.Fetching,
                 data: action.payload.FetchingResponse,
                 error: action.payload.FetchingError
             }
         case FetchingCourseCategoryFailure:
            console.log("course category reducer failure : ");
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

export default courseCategoryReducer