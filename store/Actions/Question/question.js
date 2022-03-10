import { FetchingQuestions, FetchingQuestionsSuccess, FetchingQuestionsFailure, QuestionChanged } from "../../Actions/Question/actionTypes";
import ClientLayer from '../../../Components/Layers/ClientLayer';

export const onReset = () => {
    return (dispatch) => {
        dispatch(onFetchingResponse(true, null, null))
    }
}

export const fetchQuestions = (category, series) => {
    return (dispatch) => {
        dispatch(fetching(true))
        dispatch(onReset())
        dispatch(onQuestionChanged(null))
        ClientLayer.getInstance().getDataService().GetQuestions(category, series, (data) => {
            dispatch(onFetchingResponse(false, data, null))
            console.log(data, 'data')
            var selectedQuestion = []
            selectedQuestion.push(data[0])
            dispatch(onQuestionChanged(selectedQuestion))
        }, (error) => {
            dispatch(onFetchingResponse(false, [], error))
        })
    }
}

export const onSingleOptionSelect = (data) => {
    return (dispatch) => {
        var selectedQuestion = []
        selectedQuestion.push(data)
        dispatch(onQuestionChanged(selectedQuestion))
    }
}

export const changeQuestion = (data) => {
    return (dispatch) => {
        var selectedQuestion = []
        selectedQuestion.push(data)
        dispatch(onQuestionChanged(selectedQuestion))
    }
}

const onFetchingResponse = (status, data = null, error = null) => {
    return {
        type: error == null ? FetchingQuestionsSuccess : FetchingQuestionsFailure,
        payload: { Fetching: status, FetchingResponse: data, FetchingError: error }
    }
}

const onQuestionChanged = (data = null) => {
    return {
        type: QuestionChanged,
        payload: { questionChanged: data }
    }
}

const fetching = (status) => {
    return {
        type: FetchingQuestions,
        payload: { Fetching: status }
    }
}