import {FetchingSeries, FetchingSeriesSuccess, FetchingSeriesFailure} from '../../Actions/Series/actionTypes';

const SeriesFetchingState = {
    Fetching: false,
    data: null,
    error: null
}

const seriesReducer = (state=SeriesFetchingState, action) => 
{
     switch(action.type){
         case FetchingSeries:
             return {
                 ...state,
                 Fetching: action.payload.Fetching
             }
         case FetchingSeriesSuccess:
             return {
                 ...state,
                 Fetching: action.payload.Fetching,
                 data: action.payload.FetchingResponse,
                 error: action.payload.FetchingError
             }
         case FetchingSeriesFailure:
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

export default seriesReducer