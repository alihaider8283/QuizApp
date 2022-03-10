import ClientLayer from '../../../Components/Layers/ClientLayer';
import {FetchingCourseCategories, FetchingCourseCategorySuccess, FetchingCourseCategoryFailure} from '../../Actions/CourseCategories/actionTypes';

export const onReset = () => {
    return(dispatch) => {
        dispatch(onFetchingResponse(false, null, null))
    }
}

export const fetchCoursesCategory = () => {
  console.log("fetching course categories");
    return(dispatch) => {
        dispatch(fetching(true))
        console.lo
        ClientLayer.getInstance().getDataService().GetCourseCategories((data) => {
          dispatch(onFetchingResponse(false, data, null))
         }, (error) => {
          dispatch(onFetchingResponse(false, null, error))
       })
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
      type: error == null ? FetchingCourseCategorySuccess : FetchingCourseCategoryFailure,
      payload: { Fetching: status, FetchingResponse: data , FetchingError: error }
    }
  }

const fetching = (status) => {
    return {
      type: FetchingCourseCategories,
      payload: { Fetching: status }
    }
  }  