import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';
import CardView from 'react-native-cardview';
import Colors from '../../utility/colors/Colors';
import { ScrollView } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const getScreen = () => {
  return Dimensions.get('window');
}

class Home extends Component {
  state = {}

  data = [
    {
      key: 1,
      title: "Questionnaire",
      img: require('../../assets/Icons/category-icon.png')
    },
    {
      key: 2,
      title: "Cours",
      img: require('../../assets/Icons/course-icon.png')
    },
    {
      key: 3,
      title: "Panneaux",
      img: require('../../assets/Icons/sign-icon.png')
    },
    {
      key: 4,
      title: "Statistiques",
      img: require('../../assets/Icons/stats-icon.png')
    }
  ]

  getListViewItem = (item) => {
    switch (item.key) {
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
        onPress={this.getListViewItem.bind(this, item)}
      >
        <CardView
          style={styles.card}
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={5}>
          <Image style={styles.categoryIcons} source={item.img} />
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
            <Text style={styles.welcomeText} >Ma??trisez vos comp??tences de conduite</Text>
          </View>
        </View>
        <FlatList
          style={styles.categories}
          contentContainerStyle={{ width: '100%', alignItems: 'center',paddingBottom:50,}}
          data={this.data}
          renderItem={({ item }) => this.renderItem(item)}
          numColumns={2}
        />
        <View style={styles.banner}>
          <BannerAd unitId={'ca-app-pub-8187103578520437/9543060329'}
            size={BannerAdSize.ADAPTIVE_BANNER}
          />
        </View>
        <Image style={styles.car} source={require('../../assets/Icons/car.png')} />
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
    // height : getScreen().height * 0.35,
    height: '45%',
    backgroundColor: Colors.getColor('primaryColor'),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    // backgroundColor:'cyan',
  },
  logo: {
    width: 80,
    height: 80,
    top: '3%',
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
    // width: getScreen().width * 0.4, 
    width: 140,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:'3%',
    // marginLeft:  getScreen().width * 0.05,
    // marginRight:  getScreen().width * 0.05,
    marginBottom: 20,
    // backgroundColor: 'cyan'

  },
  categories: {
    width: '100%',
    height:'50%',
    marginTop: -45,
    // backgroundColor:'red'
  },
  categoryIcons: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8
  },
  car: {
    position: 'absolute',
    height: '11%',
    bottom: 0,
    width: '100%',
    resizeMode: 'contain',
    // backgroundColor:'red'
  },
  banner: {
    bottom: '12%',
    width:'100%',
  }
});