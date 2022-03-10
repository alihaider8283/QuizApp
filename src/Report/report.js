import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchQuestions, changeQuestion } from '../../store/Actions/Question/question';
import { BallIndicator } from 'react-native-indicators';
import CountDown from 'react-native-countdown-component';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
import FastImage from 'react-native-fast-image'
import SingleAnswersView from '../Quiz/singleAnswersView';
import MultipleAnswersView from '../Quiz/MultipleAnswersView';
import { StackActions } from '@react-navigation/native';
import Tts from "react-native-tts";
import ClientLayer from '../../Components/Layers/ClientLayer';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const _ = require('lodash');

class Test extends Component {

    markedQuestions = []
    actualOptions = null
    isSpeaking = false

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            index: this.props.route.params.index,
            questionStatus: 1,
            validate: false,
            next: false,
            previous: false,
            selectedRadioAnswer: null,
            currentQuestionType: null,
            restartTimer: true,
            result: null,
            showDescription: false,
            radioAnswers: 1,
            selectedBoxes: [],             // initial value : [{"label": "test 2", "value": 1}]
        };

    }

    componentDidMount() {
        this.props.changeQuestion(this.props.data[this.state.index])
        Tts.getInitStatus().then(() => {
            // Tts.setDefaultLanguage('en-GB')
            Tts.setDefaultRate(0.40)

        });

        this.showNextAndPreviousButtons()
        this.setPredefinedAnswers()

    }

    onPressTryAgain = () => {
        // this.props.fetchQuestions(this.state.category,this.state.series);
    }

    setPredefinedAnswers = () => {

        this.props.data[this.state.index].questions.map(item => {

            if (item.questionType == 'single') {
                for (var i = 0; i < item.options.length; i++) {
                    if (item.options[i].value == 1) {
                        this.setState({
                            radioAnswers: i + 1
                        })
                        break;
                    }
                }
            } else {
                var actualOptions = item.options.filter(
                    (x) => x.key == 1
                )
                this.setState({
                    selectedBoxes: actualOptions
                })
            }
        })
    }

    componentDidUpdate() {

        if (this.isSpeaking == false && this.props.data != null) {
            if (this.props.data[this.state.index].language) {
                Tts.setDefaultLanguage('fr-FR')
            } else {
                Tts.setDefaultLanguage('en-GB')
            }
            // Tts.speak(this.props.data[this.state.index].description);
            this.props.data[this.state.index].questions.map(item => {
                item.description && Tts.speak(item.description)
            })
            this.isSpeaking = true
        }

    }

    showNextAndPreviousButtons = () => {
        if (this.state.index + 1 < this.props.data.length) {
            this.setState({
                next: true
            })
        }
        if (this.state.index > 0) {
            this.setState({
                previous: true
            })
        } else {
            this.setState({
                previous: false
            })
        }
    }

    componentWillUnmount() {
        Tts.stop()
    }


    textToSpeech = () => {
        console.log('language : ', this.props.data[this.state.index].language)
        if (this.props.data[this.state.index].language) {
            Tts.setDefaultLanguage('fr-FR')
        } else {
            Tts.setDefaultLanguage('en-GB')
        }
        this.props.data[this.state.index].questions.map(item => {
            item.description && Tts.speak(item.description)
        })
    }

    showDescription = () => {
        this.setState({
            showDescription: !this.state.showDescription
        })
    }

    loadNextQuestion() {
        this.setState({
            index: this.state.index + 1,
            next: false,
            result: null
        }, () => {
            if (this.state.index < this.props.data.length) {
                this.setState({
                    restartTimer: true
                })
                this.props.changeQuestion(this.props.data[this.state.index])
                Tts.stop()
                this.textToSpeech()
                this.showNextAndPreviousButtons()
                this.setPredefinedAnswers()
            }
        })
    }

    onPressPrevious = () => {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1,
                next: false,
                result: null
            }, () => {
                if (this.state.index >= 0) {
                    this.props.changeQuestion(this.props.data[this.state.index])
                    Tts.stop()
                    this.textToSpeech()
                    this.showNextAndPreviousButtons()
                    this.setPredefinedAnswers()
                }
            })
        }
    }

    onpressNext = () => {
        this.loadNextQuestion()
    }

    renderAnswers = (item) => {
        // console.log(item, 'render');


        if (item.questionType != 'single') {
            for (var i = 0; i < item.options.length; i++) {
                item.options[i].value = i
            }
        }
        // item.title && Tts.speak(item.title)
        // item.options && item.options.map((element, index) => {
        //     element.label && Tts.speak(element.label)
        // })

        return (
            item.questionType == 'single'
                ? <SingleAnswersView
                    status={this.state.questionStatus}
                    item={item.options}
                    initialSelection={this.state.radioAnswers}
                />
                : <MultipleAnswersView
                    disable={false}
                    item={item.options}
                    selectedBoxes={this.state.selectedBoxes}
                />
        )
    }


    renderItem = (item) => {
        console.log(item, 'Report render');
        return (
            <View>
                <CardView
                    style={styles.card}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}>
                    <View style={styles.listItemContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: item.url,
                            }}
                        >
                        </Image>
                    </View>
                </CardView>
                {/* {this.state.showDescription
                    ? <View style={styles.questionView}>
                        <Text styles={styles.questionTitle}>{item.description}</Text>
                    </View>
                    : <View>
                        <View style={styles.questionView}>
                            <Text styles={styles.questionTitle}>{item.title}</Text>
                        </View>
                        {this.renderAnswers(item)}
                    </View>
                } */}
                <ScrollView>
                    {
                        item.questions.map(item => {
                            return (
                                <>
                                    {this.state.showDescription
                                        ? <View style={styles.questionView}>
                                            <Text styles={styles.questionTitle}>{item.description}</Text>
                                        </View>
                                        : <View>
                                            <View style={styles.questionView}>
                                                <Text styles={styles.questionTitle}>{item.title}</Text>
                                            </View>
                                            {this.renderAnswers(item)}
                                        </View>
                                    }
                                </>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                {this.props.Fetching
                    ? <BallIndicator color={Colors.getColor('secondaryColor')} />
                    : this.props.data != null
                        ? <View>
                            <View style={styles.intro}>
                                <Text style={styles.introText}>Question {this.state.index + 1} </Text>
                                {this.state.validate == false && this.state.result != null
                                    ? this.state.result
                                        ? <Image style={styles.resultFace} source={require('../../assets/Icons/hap-face.png')} />
                                        : <Image style={styles.resultFace} source={require('../../assets/Icons/sad-face.jpeg')} />
                                    : <Text></Text>}
                            </View>
                            <FlatList
                                data={this.props.selectedQuestion || []}
                                renderItem={({ item }) => this.renderItem(item)}
                            />
                            {this.state.next
                                ? <TouchableOpacity style={styles.next} onPress={() => this.onpressNext()}>
                                    <AntDesign name="right" size={20} />
                                </TouchableOpacity>
                                : <View></View>}
                            {this.state.previous
                                ? <TouchableOpacity style={styles.previous} onPress={() => this.onPressPrevious()}>
                                    <AntDesign name="left" size={20} />
                                </TouchableOpacity>
                                : <View></View>}
                            <TouchableOpacity style={styles.retweet} onPress={() => this.showDescription()}>
                                <AntDesign name="retweet" size={20} />
                            </TouchableOpacity>
                        </View>
                        : <View style={styles.emptyView}>
                            <Image style={styles.emptySign} source={require('../../assets/Icons/category-icon.png')} />
                            <Text styles={styles.errorMessage} >{this.props.error}</Text>
                            <TouchableOpacity onPress={() => this.onPressTryAgain()}>
                                <Text style={styles.tryAgain}> Try Again </Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
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
        width: windowWidth * 0.8,
        height: 150,
        marginLeft: windowWidth * 0.1,
        marginRight: windowWidth * 0.1,
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 150,
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
        width: windowWidth * 0.8,
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
    next: {
        position: 'absolute',
        bottom: 10,
        right: 50,
        backgroundColor: Colors.getColor('primaryColor'),
        padding: 10
    },
    previous: {
        position: 'absolute',
        bottom: 10,
        right: 100,
        backgroundColor: Colors.getColor('primaryColor'),
        padding: 10
    },
    retweet: {
        position: 'absolute',
        bottom: 10,
        right: 200,
        backgroundColor: Colors.getColor('primaryColor'),
        padding: 10
    }
})