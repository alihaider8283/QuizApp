import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import CardView from 'react-native-cardview';
import Colors from '../../utility/colors/Colors';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { RewardedAd, RewardedAdEventType, TestIds ,  InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { onReset, fetchQuestions, changeQuestion} from '../../store/Actions/Question/question';

const adUnitId =  TestIds.INTERSTITIAL ; //   __DEV__
  // ?  TestIds.INTERSTITIAL
  // : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

class ReportGrid extends Component {
   
    state = { 
      result: this.props.route.params.result, //need to pass questions data
      category: this.props.route.params.category,
      series: this.props.route.params.series,
      count: 0
     }

    
    componentDidMount() {

      this.props.fetchQuestions(this.state.category,this.state.series);
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

     onPressTryAgain = () => {
        this.props.fetchQuestions(this.state.category,this.state.series);
    } 

    getListViewItem = (item) => {  
       this.props.navigation.navigate('Report', {
        index : item.index
    });
    }  

      renderItem = (item) => {
        return (
              <TouchableOpacity 
                onPress= {this.getListViewItem.bind(this, item)}
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 5,
                  }}
                >
                    <CardView
                      style={{ justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      backgroundColor : item.value == true ? Colors.getColor('green') : Colors.getColor('secondaryColor')}}
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}>
                        <Text style={styles.text}>
                          {item.index + 1}
                        </Text>
                    </CardView>
              </TouchableOpacity>
        );
      }

    render() { 
        return (
            <View style={styles.container}>
              { this.props.Fetching 
            ?  <BallIndicator color={Colors.getColor('secondaryColor')} />
            :  this.props.data != null
               ?  <FlatList  
                    data={this.state.result}  
                    renderItem={({item}) =>  this.renderItem(item) }  
                    numColumns={4}
                    keyExtractor={(item, index) => index}
                />
               :  <View style={styles.emptyView}>
                   <Image  style={styles.emptySign} source={require('../../assets/Icons/category-icon.png')}/>
                   <Text styles={styles.errorMessage} >{this.props.error}</Text> 
                   <TouchableOpacity onPress={ () => this.onPressTryAgain()}>
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
 
export default connect(mapStateToProps, mapDispatchToProps) (ReportGrid);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
      },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    text: {
        color: Colors.getColor('white')
    }  
})
