import {FetchingCategories, FetchingSuccess, FetchingFailure} from '../../Actions/Category/actionTypes';

const CategoryFetchingState = {
    Fetching: false,
    data: null,
    error: null
}

const categoryReducer = (state=CategoryFetchingState, action) => 
{
     switch(action.type){
         case FetchingCategories:
             return {
                 ...state,
                 Fetching: action.payload.Fetching
             }
         case FetchingSuccess:
             console.log("category reducer success : ");
             return {
                 ...state,
                 Fetching: action.payload.Fetching,
                 data: action.payload.FetchingResponse,
                 error: action.payload.FetchingError
             }
         case FetchingFailure:
            console.log("category reducer failure : ");
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

export default categoryReducer