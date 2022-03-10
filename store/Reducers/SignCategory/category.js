import {FetchingSignCategories, FetchingSignCategorySuccess, FetchingSignCategoryFailure} from '../../Actions/SignCategories/actionTypes';

const SignCategoryFetchingState = {
    Fetching: false,
    data: null,
    error: null
}

const signCategoryReducer = (state=SignCategoryFetchingState, action) => 
{
     switch(action.type){
         case FetchingSignCategories:
             return {
                 ...state,
                 Fetching: action.payload.Fetching
             }
         case FetchingSignCategorySuccess:
             console.log("sign category reducer success : ");
             return {
                 ...state,
                 Fetching: action.payload.Fetching,
                 data: action.payload.FetchingResponse,
                 error: action.payload.FetchingError
             }
         case FetchingSignCategoryFailure:
            console.log("sign category reducer failure : ");
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

export default signCategoryReducer