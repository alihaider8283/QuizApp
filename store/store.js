import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers

import categoryReducer from './Reducers/Category/category';
import signReducer from './Reducers/Sign/sign';
import courseReducer from './Reducers/Course/course';
import seriesReducer from './Reducers/Series/series';
import questionReducer from './Reducers/Question/question';
import coruseCategoryReducer from './Reducers/CourseCategory/category';
import signCategoryReducer from './Reducers/SignCategory/category';

const appReducers = combineReducers({
    category: categoryReducer,
    sign: signReducer,
    course: courseReducer,
    series: seriesReducer,
    question: questionReducer,
    courseCategory: coruseCategoryReducer,
    signCategory: signCategoryReducer

}) 

const rootReducer = (state, action) => {
    return appReducers(state, action)
}

// setting up middleware for application
const middlewares = applyMiddleware(thunk)

//  configuring store
const store = createStore(rootReducer, {} , middlewares)

export default store