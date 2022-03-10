import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingCategories, FetchingSuccess, FetchingFailure} from '../../Actions/Category/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchCategories = () => {
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().GetCategories( (data) => {
          dispatch(onFetchingResponse(false, data, null))
         }, (error) => {
          dispatch(onFetchingResponse(false, null, error))
       })
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
      type: error == null ? FetchingSuccess : FetchingFailure,
      payload: { Fetching: status, FetchingResponse: data , FetchingError: error }
    }
  }

  const fetching = (status) => {
    return {
      type: FetchingCategories,
      payload: { Fetching: status }
    }
  }  