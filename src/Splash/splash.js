import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { NavigationActions, StackActions } from '@react-navigation/native';
import ClientLayer from '../../Components/Layers/ClientLayer';

class Splash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

   componentDidMount(){
       setTimeout(()=>{
        ClientLayer.getInstance().getDataManager().GetValueForKey('isFirstTime', response => {
           console.log("Storage : ",JSON.parse(response));
           if(response == null){
                this.props.navigation.dispatch(
                    StackActions.replace('OnBoarding')
                );
           }else {
                this.props.navigation.dispatch(
                    StackActions.replace('Home')
                );
           }
        });
       },3000);
   }

    render() { 
        return (
            <View style={styles.container}>
                <StatusBar  hidden={true} />
                 <Image style = {styles.logo} source = {require('../../assets/Icons/logo.png')}/>  
                 <Image style = {styles.car} source = {require('../../assets/Icons/car.png')}/>  
            </View>
          );
    }
}
 
export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    },
    bottom: {
        flex: 1,
    },
    car: {
        position: 'absolute',
        height: 100,
        bottom:0,
        width: '100%',
        resizeMode: 'contain'
    }
  });