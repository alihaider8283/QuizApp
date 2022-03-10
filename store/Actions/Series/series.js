import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingSeries, FetchingSeriesSuccess, FetchingSeriesFailure} from '../../Actions/Series/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchSeries = (category) => {
  console.log("fetching series");
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().GetSeries(category, (data) => {
          dispatch(onFetchingResponse(false, data, null))
         }, (error) => {
          dispatch(onFetchingResponse(false, null, error))
       })
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
      type: error == null ? FetchingSeriesSuccess : FetchingSeriesFailure,
      payload: { Fetching: status, FetchingResponse: data , FetchingError: error }
    }
  }

  const fetching = (status) => {
    return {
      type: FetchingSeries,
      payload: { Fetching: status }
    }
  }  