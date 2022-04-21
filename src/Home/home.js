import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import CardView from 'react-native-cardview';
import Colors from '../../utility/colors/Colors';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


class Home extends Component {
    state = {  }

    data = [
      {
        key : 1,
        title: "Questionnaire",
        img: require('../../assets/Icons/category-icon.png')
      },
      {
        key : 2,
        title: "Cours",
        img: require('../../assets/Icons/course-icon.png')
      },
      {
        key : 3,
        title: "Panneaux",
        img: require('../../assets/Icons/sign-icon.png')
      },
      {
        key : 4,
        title: "Statistiques",
        img: require('../../assets/Icons/stats-icon.png')
      }
    ]
   
    getListViewItem = (item) => {  
      switch(item.key){
        case 1:
              // this.props.navigation.navigate('Result');
              this.props.navigation.navigate('Category');
              break;
        case 2:
              this.props.navigation.navigate('CourseCategory');
              break;
        case 3:
              this.props.navigation.navigate('Sign');
              break;
        case 4:
              this.props.navigation.navigate('Stats');
              break;                  
      } 
  }  

  renderItem = (item) => {
    return (
          <TouchableOpacity 
            onPress= {this.getListViewItem.bind(this, item)}
            >
                <CardView
                  style={styles.card}
                  cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={5}>
                    <Image  style={styles.categoryIcons} source={item.img}/>
                    <Text>
                      {item.title}
                    </Text>
                </CardView>
          </TouchableOpacity>
    );
  }

    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.introView}>
                  <Image style={styles.logo} source={require('../../assets/Icons/logo-horizontal.png')} />
                  <View >
                    <Text style={styles.welcomeText} >Bienvenue dans Conduisez maintenant</Text>
                    <Text style={styles.welcomeText} >Maîtrisez vos compétences de conduite</Text>
                  </View>
                </View>
                <FlatList  
                    style={styles.categories}
                    data={this.data}  
                    renderItem={({item}) =>  this.renderItem(item) }  
                    numColumns={2}
                />  
                <View style={styles.banner}>
                    <BannerAd  unitId={'ca-app-pub-8187103578520437/9543060329' } 
                    size={BannerAdSize.ADAPTIVE_BANNER}
                    />
                </View>
                <Image style = {styles.car} source = {require('../../assets/Icons/car.png')}/> 
            </View>
          );
    }
}
 
export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    introView: {
      height : windowHeight * 0.35,
      backgroundColor: Colors.getColor('primaryColor'),
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      justifyContent: 'center'
    },
    logo: {
     width: 80,
     height: 80,
     top: 10,
     left: 20,
     resizeMode: 'contain',
     position: 'absolute'
    },
    welcomeText: {
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: "bold"
    },
    card: {
      width: windowWidth * 0.4, 
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: windowWidth * 0.05,
      marginRight: windowWidth * 0.05,
      marginBottom: 20,
    },
    categories: {
      marginTop: -50
    },
    categoryIcons: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
      marginBottom: 8
    },
    car: {
      position: 'absolute',
      height: 100,
      bottom:0,
      width: '100%',
      resizeMode: 'contain'
    }, 
    banner : {
      bottom: 120
    }
  });