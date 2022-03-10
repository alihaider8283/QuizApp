import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import Pages from '../utility/pagesList';
import Onboarding from 'react-native-onboarding-swiper';
import { StackActions } from '@react-navigation/native';
import ClientLayer from '../../Components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';

class OnBoardingScreens extends Component {
    state = {  }

    componentDidMount() {
      // console.log("Pages List : ",Pages.getPages());
    }

   setOnBoarding () {
      ClientLayer.getInstance().getDataManager().SaveValueForKey('isFirstTime', JSON.stringify(false));
   }

    nextButtonPressed  () {
      this.setOnBoarding();
      this.props.navigation.dispatch(
        StackActions.replace('Home')
      );  
    } 

    skipButtonPressed  () {
      this.setOnBoarding();
      this.props.navigation.dispatch(
        StackActions.replace('Home')
      );  
    } 

    render() { 
        return (
            <View style={styles.container}>
              <StatusBar hidden={true}/>
              <Onboarding 
               onDone={ () => this.nextButtonPressed()}
               onSkip={ () => this.skipButtonPressed()}
               titleStyles={styles.title}
               pages= {[
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img} source={require('../../assets/Icons/quiz.png')} />,
                    title: 'Take A Quiz',
                    subtitle: 'You can test your abilities by taking a quiz and improve yourself',
                  },
                  {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img}  source={require('../../assets/Icons/sign.png')} />,
                    title: 'Street Signs',
                    subtitle: 'Learn about street signs and outstand the driving tests',
                  },
                  {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img}  source={require('../../assets/Icons/stats.png')} />,
                    title: 'Statistics',
                    subtitle: 'Keep Record of your performance throughout the learning process',
                  }
              ]}
              />
            </View>
          );
    }
}
 
export default OnBoardingScreens;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    img: {
      width: 300,
      height: 300,
      resizeMode: 'contain'
    },
    title: {
      color: Colors.getColor('primaryColor'),
      fontWeight:  'bold'
    }
  });