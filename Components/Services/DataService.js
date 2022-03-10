import { BASE_URL, getCategories, getSigns, getCourses, getSeries, getQuestions, getCourseCategories, getSignCategories } from '../Common/Constants';
import axios from 'react-native-axios'

class DataService {

    GetCategories(successCallBack, errorCallBack) {
        axios.get(getCategories, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(function (response) {

                if (response.data.status == 200) {
                    successCallBack(response.data.feed)
                } else if (response.data.status == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    GetSigns(category, successCallBack, errorCallBack) {
        console.log("GetSigns Called", category);
        axios.post(getSigns, {
            category: category
        },
            {
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            .then(function (response) {

                console.log("GetSigns response : ");
                if (response.data.status == 200) {
                    successCallBack(response.data.feed)
                } else if (response.data.status == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch(function (error) {
                console.log("GetSigns error : ", error);
                errorCallBack("Network Error")
            })
    }

    getCourses(category, successCallBack, errorCallBack) {
        axios.post(getCourses, {
            category: category
        },
            {
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            .then(function (response) {
                console.log(response.data, 'test');
                if (response.data.status == 200) {
                    successCallBack(response.data.feed)
                } else if (response.data.status == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    GetSeries(category, successCallBack, errorCallBack) {
        axios.post(getSeries, {
            category: category
        }, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(function (response) {
                if (response.data.code == 200) {
                    successCallBack(response.data.message)
                } else if (response.data.code == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch(function (error) {
                errorCallBack("Network Error")
            })
    }

    GetQuestions(category, series, successCallBack, errorCallBack) {
        axios.post(getQuestions, {
            category: category,
            seriesNumber: series.toString()
        }, {
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then((response) => {
                console.log(response.data, 'get Questions')
                if (response.data.code == 200) {
                    const arr = [...response.data.data];

                    let arrrr = arr.map((item) => {
                        return {
                            ...item,
                            questions: item.questions.map((qna, index) => {
                                return {
                                    ...qna, _id: Math.floor(Math.random() * 99999), options: qna.options.map((op) => {
                                        if(op?.label != undefined){
                                        return {
                                            ...op, check: false,
                                            id: Math.floor(Math.random() * 99999),
                                            QNAIndex: index,
                                        }
                                    }else{
                                        return{
                                            ...op, check: false,
                                            id: Math.floor(Math.random() * 99999),
                                            QNAIndex: index,
                                            label:"as",
                                        }
                                    }
                                    })
                                }
                            })
                        }
                    })
                    console.log(arrrr[0].questions[0], 'get Questions');

                    successCallBack(arrrr)
                } else if (response.data.code == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
                errorCallBack("Network Error")
            })
    }

    GetCourseCategories(successCallBack, errorCallBack) {
        axios.get(getCourseCategories)
            .then((response) => {
                console.log("response :", response.data.status)
                if (response.data.status == 200) {
                    successCallBack(response.data.feed)
                } else if (response.data.status == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch((error) => {
                errorCallBack("Network Error")
            })
    }

    GetSignCategories(successCallBack, errorCallBack) {
        axios.get(getSignCategories)
            .then((response) => {
                if (response.data.status == 200) {
                    successCallBack(response.data.feed)
                } else if (response.data.status == 201) {
                    errorCallBack(response.data.message)
                } else {
                    errorCallBack(response.data.message)
                }
            })
            .catch((error) => {
                errorCallBack("Network Error")
            })
    }

}

export default DataService