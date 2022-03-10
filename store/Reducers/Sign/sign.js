import {FetchingSigns, FetchingSignsSuccess, FetchingSignsFailure} from '../../Actions/Signs/actionTypes';

const SignsFetchingState = {
    FetchingSign: false,
    signsData: null,
    signsError: null
}

const signReducer = (state=SignsFetchingState, action) => 
{
     switch(action.type){
         case FetchingSigns:
             return {
                 ...state,
                 FetchingSign: action.payload.Fetching
             }
         case FetchingSignsSuccess:
             console.log("FetchingSignsSuccess")
             return {
                 ...state,
                 FetchingSign: action.payload.Fetching,
                 signsData: action.payload.FetchingResponse,
                 signsError: action.payload.FetchingError
             }
         case FetchingSignsFailure:
            console.log("FetchingSignsFailure")

             return {
                ...state,
                FetchingSign: action.payload.Fetching,
                signsData: action.payload.FetchingResponse,
                signsError: action.payload.FetchingError
             }
         default:
             return state            
     }
}

export default signReducer