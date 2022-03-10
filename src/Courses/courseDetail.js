import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import Colors from '../../utility/colors/Colors';
import { connect } from 'react-redux';
import { onReset, fetchCourses} from '../../store/Actions/Courses/courses';
import { RewardedAd, RewardedAdEventType, TestIds ,  InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { BallIndicator } from 'react-native-indicators';
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Tts from "react-native-tts";

const adUnitId =  TestIds.INTERSTITIAL ; //   __DEV__
  // ?  TestIds.INTERSTITIAL
  // : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);


class CourseDetail extends Component {
    selectedCourse = null;
    
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true, 
          isSpeaking: false, 
          course: this.props.route.params.currentCourse,
          count: 0
        };
      }

    componentDidMount () {

        this.selectedCourse = this.props.data.filter(
            (x) => x.id == this.state.course
        )
        this.setState({
            isLoading: false
        })
       


        interstitialAd.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
              console.log('InterstitialAd adLoaded');
              this.showAd();
            } else if (type === AdEventType.ERROR) {
              console.warn('InterstitialAd => Error');
            } else if (type === AdEventType.OPENED) {
              console.log('InterstitialAd => adOpened');
            } else if (type === AdEventType.CLICKED) {
              console.log('InterstitialAd => adClicked');
            } else if (type === AdEventType.LEFT_APPLICATION) {
              console.log('InterstitialAd => adLeft_App');
            } else if (type === AdEventType.CLOSED) {
              console.log('InterstitialAd => adClosed');
              this.speakCourseDescription();
              this.setState({
                count : 1
              })
            }
          });
      
        interstitialAd.load();

    }  


    showAd() {
        if (interstitialAd.loaded && this.state.count == 0) {
          interstitialAd.show().catch(error => console.warn(error));
        }
      }

    speakCourseDescription = () => {
        Tts.getInitStatus().then(() => {
            Tts.setDefaultLanguage('en-GB')
            Tts.setDefaultRate(0.50)
          });

          if(this.selectedCourse[0].language){
            Tts.setDefaultLanguage('fr-FR')
            Tts.speak(this.selectedCourse[0].description);
            Tts.speak(this.selectedCourse[0].description2);
            Tts.speak(this.selectedCourse[0].description3);
        } else {
            Tts.setDefaultLanguage('en-GB')
            Tts.speak(this.selectedCourse[0].description);
            Tts.speak(this.selectedCourse[0].description2);
            Tts.speak(this.selectedCourse[0].description3);
        }
    }   

    componentWillUnmount() {
        Tts.stop()
    }

    render() { 
        return (
             <View style={styles.container}>
                 {
                     this.state.isLoading
                     ? <BallIndicator color={Colors.getColor('secondaryColor')} />
                     : <View  style={styles.container}>
                           <Image
                                style={styles.signImage}
                                source={{
                                uri: this.selectedCourse[0].url,
                                }}
                            />
                            <Text style={styles.title}>Description</Text>
                            <ScrollView scrollEnabled>
                            <Text style={styles.description}>{this.selectedCourse[0].description}</Text>
                            <Text style={styles.description}>{this.selectedCourse[0].description2}</Text>
                            <Text style={styles.description}>{this.selectedCourse[0].description3}</Text>
                            </ScrollView>
                       </View>
                 }
             </View>
          );
    }
}
 
// Mapping States To Props
const mapStateToProps = (state) => {
    return {
        Fetching: state.course.Fetching ,
        data: state.course.data,
        error: state.course.error,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchSigns: () => dispatch(fetchSigns())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (CourseDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getColor('cardBackground')
    },
    signImage: {
        width: windowWidth,
        height: windowHeight * 0.35,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.getColor('secondaryColor'),
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 20
    },
    description: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        textAlign: 'justify'
    }
})