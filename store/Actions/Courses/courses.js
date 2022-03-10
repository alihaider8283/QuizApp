import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingCourses, FetchingSuccess, FetchingFailure} from '../../Actions/Courses/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchCourses = (category) => {
  console.log("fetching courses");
    return(dispatch) => {
        dispatch(fetching(true))
        ClientLayer.getInstance().getDataService().getCourses(category, (data) => {
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
      type: FetchingCourses,
      payload: { Fetching: status }
    }
  }  