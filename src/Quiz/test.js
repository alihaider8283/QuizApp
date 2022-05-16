import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image, Modal, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchQuestions, changeQuestion } from '../../store/Actions/Question/question';
import { BallIndicator } from 'react-native-indicators';
import CountDown from 'react-native-countdown-component';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
import FastImage from 'react-native-fast-image'
import SingleAnswersView from './singleAnswersView';
import MultipleAnswersView from './MultipleAnswersView';
import { StackActions } from '@react-navigation/native';
import Tts from "react-native-tts";
import moment from 'moment';
import ClientLayer from '../../Components/Layers/ClientLayer';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const _ = require('lodash');

const WP = (value) => {
    let widthpercent = windowWidth / 100;
    return widthpercent * value
}

class Test extends Component {

    markedQuestions = []
    actualOptions = null
    isSpeaking = false

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            showImage: false,
            selectedImage: null,
            category: this.props.route.params.category,
            series: this.props.route.params.series,
            index: 0,
            questionStatus: 0,
            validate: false,
            next: false,
            selectedRadioAnswer: null,
            currentQuestionType: null,
            restartTimer: false,
            result: null,
            selectedBoxes: [],
            nextLoading: false,            // initial value : [{"label": "test 2", "value": 1}]
        };

    }

    componentDidMount() {
        console.log("componentDidMount",)

        this.props.fetchQuestions(this.state.category, this.state.series);
        Tts.getInitStatus().then(() => {
            Tts.setDefaultRate(0.40)

        });
        // console.log(this.state.category, this.state.series, 'testttttt')
    }

    onPressTryAgain = () => {
        this.props.fetchQuestions(this.state.category, this.state.series);
    }
    componentDidUpdate() {
        try {
            // console.log(this.props, 'props data')
            if (this.isSpeaking == false && this.state.index == 0 && this.props.data != null && this.props.data.length != 0) {
                // console.log(this.props.selectedQuestion.data[0], 'datatata')
                if (this.props.data[0].language) {
                    Tts.setDefaultLanguage('fr-FR')
                } else {
                    Tts.setDefaultLanguage('en-GB')
                }
                this.props.data[0].questions.map(item => {
                    item.title && Tts.speak(item.title)
                    item.options && item.options.map((element, index) => {
                        element?.label && Tts.speak(element.label)
                    })

                })

                this.isSpeaking = true
                setTimeout(() => {
                    this.setState({ restartTimer: true })
                }, 10000);
                console.log('timer')
            }
        } catch (error) {
            console.log(error, 'componentDidUpdate error');
        }
    }

    componentWillUnmount() {
        Tts.stop()
    }

    onRadioButtonSelected = (value) => {
        Tts.stop()
        console.log(value, 'selected radio button selected')

        let Arr = this.props.selectedQuestion;
        Arr[0].questions[value.QNAIndex].options.map((item) => {
            if (item.id == value.id && value.check == true) {
                value.check = false;
            } else {
                value.check = true;
            }
        })
        // console.log(Arr[0].questions, 'selected radio button selected')

        if (value.value == 1) {
            this.setState({
                validate: true,
                selectedRadioAnswer: true
            })
        } else {
            this.setState({
                validate: true,
                selectedRadioAnswer: false
            })
        }
    }



    textToSpeech = () => {
        if (this.props.data[this.state.index].language) {
            Tts.setDefaultLanguage('fr-FR')
        } else {
            Tts.setDefaultLanguage('en-GB')
        }
        this.props.data[this.state.index].questions.map(item => {
            Tts.speak(item.title)
            item.options.map((element, index) => {
                Tts.speak(element?.label)
            })

        })


    }

    onCheckBoxesSelected = (value) => {
        Tts.stop()

        let Arr = this.props.selectedQuestion;
        Arr[0].questions[value.QNAIndex].options.map((item) => {
            if (item.id == value.id) {
                if (item.check) {
                    item.check = false;
                } else {
                    item.check = true;
                }
            }
            console.log(item.check, 'Check multiple');

        })

        this.setState({
            selectedBoxes: Arr,
            validate: this.state.next == true ? false : true
        })
    }

    markQuestionWithCheckBoxes = () => {

        let Arr = this.props.selectedQuestion;
        let check = false;
        Arr[0].questions.map((QNA, index) => {

            QNA.options.map((item) => {
                if (item?.value == 1 && item?.check == true) {
                    check = true
                }
                console.log(item.check, 'Check multiple');
            })
        })
        return check
        // var answerListActual = []
        // var selectedAnswersList = []

        // for (var i = 0; i < actualOptions.length; i++) {
        //     answerListActual.push(actualOptions[i].label)
        // }

        // for (var i = 0; i < this.state.selectedBoxes.length; i++) {
        //     selectedAnswersList.push(this.state.selectedBoxes[i].label)
        // }

        // return _.isEqual(answerListActual, selectedAnswersList.sort())
    }

    loadNextQuestion() {
        this.setState({
            index: this.state.index + 1,
            next: false,
            result: null,
            selectedBoxes: [],
            nextLoading: true,
        }, () => {
            if (this.state.index < this.props.data.length) {
                console.log("second selected")
                setTimeout(() => {
                    this.setState({ restartTimer: true })
                }, 10000);
                this.props.changeQuestion(this.props.data[this.state.index])
                this.textToSpeech()
                this.setState({ nextLoading: false })

            } else {
                console.log("Answers List : ", this.markedQuestions)
                console.log("No More Questions")
                var progressObject = {
                    category: this.state.category,
                    series: this.state.series,
                    date: moment().format("DD/MM/YYYY"),
                    questionsCount: this.props.data.length,
                    percentage: this.getSuccessPercent(this.props.data.length, this.markedQuestions),
                    result: this.markedQuestions
                }
                this.saveProgress(progressObject)
                this.props.navigation.dispatch(
                    StackActions.replace('Result', { result: this.markedQuestions })
                );
            }
        })
    }

    getSuccessPercent = (totalQuestions, testResult) => {

        var successCount = 0;

        for (var i = 0; i < testResult.length; i++) {
            if (testResult[i].value) {
                successCount++
            }
        }

        if (successCount > 0) {
            return successCount / totalQuestions
        } else {
            return 0
        }
    }

    saveProgress = (progress) => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('stats', response => {
            if (response == null) {
                var progressList = []
                progressList.push(progress)
                ClientLayer.getInstance().getDataManager().SaveValueForKey('stats', JSON.stringify(progressList))
            } else {
                var progressList = JSON.parse(response)
                progressList.push(progress)
                ClientLayer.getInstance().getDataManager().SaveValueForKey('stats', JSON.stringify(progressList))
            }
        });
    }

    onTimerCompleted = () => {
        this.setState({
            restartTimer: false,
            validate: false,
            next: true,
            result: false
        })
        let obj = {
            index: this.state.index,
            value: false,
        }
        this.markedQuestions.push(obj)
    }

    onValidate = () => {
        let Arr = this.props.selectedQuestion;
        let type = Arr[0].questions[0]?.questionType
        switch (type) {
            case 'single':
                console.log('single')
                let obj = {
                    index: this.state.index,
                    value: this.state.selectedRadioAnswer
                }
                this.markedQuestions.push(obj)
                this.setState({
                    result: obj.value,
                    selectedRadioAnswer: null,
                    restartTimer: false,
                    next: true,
                    validate: false
                })
                break;
            case 'multiple':
                var answer = this.markQuestionWithCheckBoxes()
                let obj2 = {
                    index: this.state.index,
                    value: answer
                }
                this.markedQuestions.push(obj2)
                this.setState({
                    result: answer,
                    restartTimer: false,
                    validate: false,
                    next: true
                })
                break;
        }
    }

    onpressNext = () => {
        this.loadNextQuestion()
    }

    renderAnswers = (item) => {
        // console.log(item, 'renderAnswers')
        if (item.questionType != 'single') {
            for (var i = 0; i < item?.options?.length; i++) {
                item.options[i].value = i
            }
        }

        return (
            item?.questionType == 'single'
                ? <SingleAnswersView
                    status={this.state.questionStatus}
                    item={item.options}
                    initialSelection={3}
                    onRadioButtonSelected={this.onRadioButtonSelected}
                />
                : <MultipleAnswersView
                    item={item.options}
                    disable={true}
                    selectedBoxes={this.state.selectedBoxes}
                    onCheckBoxesSelected={this.onCheckBoxesSelected}
                />
        )
    }


    renderItem = (item) => {
        // console.log(item, 'renderItem')
        return (
            <View style={{flex:1,}}>
                <CardView
                    style={styles.card}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}>
                    <Pressable
                        onPress={() => this.setState({
                            showImage: true,
                            selectedImage: item.url

                        })}
                        style={styles.listItemContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: item.url,
                            }}
                        >
                        </Image>
                    </Pressable>
                </CardView>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: WP(20) }}
                >
                    {
                        item?.questions.map(item => {
                            return (
                                <>
                                    <View style={styles.questionView}>
                                        <Text styles={styles.questionTitle}>{item?.title}</Text>

                                    </View>
                                    {this.renderAnswers(item)}
                                </>
                            )
                        })
                    }
                </ScrollView> 
            </View>
        );
    }

    render() {

        console.log("Language Flag : ", this.props.selectedQuestion)


        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showImage}
                    onRequestClose={() => {
                        this.setState({ showImage: false })
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(0,0,0,0.7)' }}>
                        <TouchableOpacity style={{position:'absolute',top:40,right:20 , zIndex:1, }}
                         onPress={() => {
                            this.setState({ showImage: false })
                        }}
                        >
                        <Image
                            style={{ width: 20, height: 20, }}
                            resizeMode='contain'
                            source={require('../../assets/Icons/close.png')}
                        />
                        </TouchableOpacity>
                        <Image
                            style={{ width: '100%', height: '100%', flex: 1 }}
                            resizeMode='contain'
                            source={{
                                uri: this.state.selectedImage,
                            }}
                        />

                    </View>
                </Modal>
                {this.props.Fetching
                    ? <BallIndicator color={Colors.getColor('secondaryColor')} />
                    : this.props.data != null && this.props.data.length != 0 && this.state.nextLoading == false
                        ? <View>
                            <View style={styles.intro}>
                                <Text style={styles.introText}>Question {this.state.index + 1} </Text>
                                {this.state.validate == false && this.state.result != null
                                    ? this.state.result
                                        ? <Image style={styles.resultFace} source={require('../../assets/Icons/hap-face.png')} />
                                        : <Image style={styles.resultFace} source={require('../../assets/Icons/sad-face.jpeg')} />
                                    : <Text></Text>}

                                {this.state.restartTimer
                                    ? <CountDown
                                        style={styles.counter}
                                        until={60}
                                        digitTxtStyle={{ color: Colors.getColor('secondaryColor') }}
                                        digitStyle={styles.customCounterStyles}
                                        onFinish={() => this.onTimerCompleted()}
                                        size={12}
                                        timeToShow={['S']}
                                        timeLabels={{ s: null }}
                                    />
                                    : <Text></Text>}
                            </View>
                            <FlatList
                                data={this.props.selectedQuestion || []}
                                renderItem={({ item }) => this.renderItem(item)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            {this.state.validate
                                ? <TouchableOpacity style={styles.validate} onPress={() => this.onValidate()}>
                                    <Text>Valider</Text>
                                </TouchableOpacity>
                                : <View></View>}
                            {this.state.next
                                ? <TouchableOpacity style={styles.validate} onPress={() => this.onpressNext()}>
                                    <Text>Suivante</Text>
                                </TouchableOpacity>
                                : <View></View>}
                        </View>
                        : <View style={styles.emptyView}>
                            <Image style={styles.emptySign} source={require('../../assets/Icons/category-icon.png')} />
                            <Text styles={styles.errorMessage} >{this.props.error}</Text>
                            <TouchableOpacity onPress={() => this.onPressTryAgain()}>
                                <Text style={styles.tryAgain}> Réessayer </Text>
                            </TouchableOpacity>
                        </View>
                }
            </SafeAreaView>
        );
    }
}

// Mapping States To Props
const mapStateToProps = (state) => {
    return {
        Fetching: state.question.Fetching,
        data: state.question.data,
        error: state.question.error,
        selectedQuestion: state.question.selectedQuestion
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchQuestions: (category, series) => dispatch(fetchQuestions(category, series)),
        changeQuestion: (data) => dispatch(changeQuestion(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        height: windowHeight * 0.05,
        width: windowWidth - 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        // width: windowWidth * 0.8 , 
        // height: 150,
        // marginLeft: windowWidth * 0.1,
        // marginRight: windowWidth * 0.1,
        // marginTop: 10,
    },
    image: {
        width: '100%',
        height: WP(75),
        resizeMode: 'contain',
    },
    introText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: "bold",
    },
    counter: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
    },
    customCounterStyles: {
        borderColor: Colors.getColor('secondaryColor'),
        backgroundColor: Colors.getColor('cardBackground'),
        borderWidth: 2,
        borderRadius: 15
    },
    listItemContainer: {
        flexDirection: 'column'
    },
    questionView: {
        // width: windowWidth * 0.8,
        marginLeft: windowWidth * 0.1,
        marginRight: windowWidth * 0.1,
        marginTop: 10,
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    description: {
        marginLeft: 5,
        marginRight: 5,
    },
    resultFace: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        marginRight: 80,
    },
    emptySign: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 15
    },
    emptyView: {
        justifyContent: "center",
        alignItems: 'center'
    },
    tryAgain: {
        backgroundColor: Colors.getColor('primaryColor'),
        marginTop: 5,
        padding: 5
    },
    errorMessage: {
        fontWeight: '600',

    },
    validate: {
        position: 'absolute',
        bottom: 10,
        right: 50,
        backgroundColor: Colors.getColor('primaryColor'),
        padding: 10
    }
})