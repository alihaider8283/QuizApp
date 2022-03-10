import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingSigns, FetchingSignsSuccess, FetchingSignsFailure} from '../../Actions/Signs/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchSigns = (category) => {
  console.log("fetching signs");
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().GetSigns(category, (data) => {
          dispatch(onFetchingResponse(false, data, null))
         }, (error) => {
          dispatch(onFetchingResponse(false, null, error))
       })
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
      type: error == null ? FetchingSignsSuccess : FetchingSignsFailure,
      payload: { Fetching: status, FetchingResponse: data , FetchingError: error }
    }
  }

  const fetching = (status) => {
    return {
      type: FetchingSigns,
      payload: { Fetching: status }
    }
  }  