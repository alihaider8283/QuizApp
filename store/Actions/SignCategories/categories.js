import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingSignCategories, FetchingSignCategorySuccess, FetchingSignCategoryFailure} from '../../Actions/SignCategories/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchSignCategories = () => {
  console.log("fetching course categories");
    return(dispatch) => {
        dispatch(fetching(true))
        console.lo
        ClientLayer.getInstance().getDataService().GetSignCategories((data) => {
          dispatch(onFetchingResponse(false, data, null))
         }, (error) => {
          dispatch(onFetchingResponse(false, null, error))
       })
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
      type: error == null ? FetchingSignCategorySuccess : FetchingSignCategoryFailure,
      payload: { Fetching: status, FetchingResponse: data , FetchingError: error }
    }
  }

const fetching = (status) => {
    return {
      type: FetchingSignCategories,
      payload: { Fetching: status }
    }
  }  