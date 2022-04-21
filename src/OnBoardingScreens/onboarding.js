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
               nextLabel='suivante'
               skipLabel='Sauter'
               titleStyles={styles.title}
               pages= {[
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img} source={require('../../assets/Icons/quiz.png')} />,
                    title: 'Répondez à un questionnaire',
                    subtitle: 'Vous pouvez tester vos capacités en répondant à un quiz et vous améliorer',
                  },
                  {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img}  source={require('../../assets/Icons/sign.png')} />,
                    title: 'Plaques de rue',
                    subtitle: 'En savoir plus sur les panneaux de signalisation et réussir les tests de conduite',
                  },
                  {
                    backgroundColor: '#fff',
                    image: <Image style={styles.img}  source={require('../../assets/Icons/stats.png')} />,
                    title: 'Statistiques',
                    subtitle: `Gardez une trace de vos performances tout au long du processus d'apprentissage`,
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