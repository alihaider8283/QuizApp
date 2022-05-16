import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchSigns} from '../../store/Actions/Signs/sign';
import {  fetchSignCategories} from '../../store/Actions/SignCategories/categories';
import { BallIndicator } from 'react-native-indicators';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
import FastImage from 'react-native-fast-image'
import { Card } from "react-native-elements";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class Signs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          isFirstTime: true,
          currentSignCategory: null
        };
      }

    componentDidMount() {
        this.props.fetchSignCategories();
    }

    componentDidUpdate() {
        if(this.state.isFirstTime && this.props.data != null) {
          this.setState({
              isFirstTime: false,
              currentSignCategory: this.props.data[0].title
          }, () => {
            this.props.fetchSigns(this.state.currentSignCategory);
          })
        }
    }

    getSignCategoryItem = (item) => { 
        this.setState({
            currentSignCategory: item.title
        }, () => {
          this.props.fetchSigns(this.state.currentSignCategory);
        })
    }

    getSignItem = (item) => {  
        this.props.navigation.navigate('SignDetail', {
            currentSign : item.title
        });
    }

    onPressTryAgain = () => {
         this.props.fetchSignCategories();
    }

    onPressTryFetchingSignsAgain = () => {
        this.props.fetchSigns(this.state.currentSignCategory);
    }

    renderItem = (item) => {
        console.log('item : ',item)
        return (
              <TouchableOpacity 
                onPress= {this.getSignCategoryItem.bind(this, item)}
                >
                    <CardView
                      style={styles.card}
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}>
                        <View style={styles.listItemContainer}>
                            <Image
                                style={styles.categoryIcons}
                                source={{
                                uri: item.url,
                                }}
                            >
                            </Image>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.description} ellipsizeMode='tail' numberOfLines={2}>{item.description}</Text>
                        </View>
                    </CardView>
              </TouchableOpacity>
        );
      }

      renderIndividualSignItem = (item) => {
      
        return (
              <TouchableOpacity 
                onPress= {this.getSignItem.bind(this, item)}
                >
                    <CardView
                      style={styles.card}
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={5}>
                        <View style={styles.listItemContainer}>
                            <Image
                                style={styles.categoryIcons}
                                source={{
                                uri: item.url,
                                }}
                            >
                            </Image>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.description} ellipsizeMode='tail' numberOfLines={2}>{item.description}</Text>
                        </View>
                    </CardView>
              </TouchableOpacity>
        );
      }

    render() { 
        return ( 
            <View  style={styles.container}>
            { this.props.Fetching 
            ?  <BallIndicator color={Colors.getColor('secondaryColor')} />
            :  this.props.data != null
               ? <View style={{marginTop: 10, marginLeft:10}}>
                     <FlatList  
                     horizontal
                     data={this.props.data}  
                     renderItem={({item}) =>  this.renderItem(item) } 
                     showsHorizontalScrollIndicator={false}
                     /> 
                     <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>{this.state.currentSignCategory} Signs</Text> 
                    { this.props.Fetching == false && this.props.FetchingSigns
                            ?  <BallIndicator style={{marginTop: 100}} color={Colors.getColor('secondaryColor')} />
                            :  this.props.signsData != null
                            ? <View style={{marginTop: 10, marginLeft:10,}}>
                                    <FlatList  
                                   contentContainerStyle={{paddingBottom:150,}}
                                    data={this.props.signsData}  
                                    style={{height:'80%'}}
                                    renderItem={({item}) =>  this.renderIndividualSignItem(item) } 
                                    numColumns={4}
                                    /> 
                                </View> 
                            : <View style={styles.emptyView}>
                                <Image  style={styles.emptySign} source={require('../../assets/Icons/sign-icon.png')}/>
                                <Text styles={styles.errorMessage} >{this.props.signsError}</Text> 
                                <TouchableOpacity onPress={ () => this.onPressTryFetchingSignsAgain()}>
                                    <Text style={styles.tryAgain}> Try Again </Text>
                                </TouchableOpacity>
                                </View>  
                            }
                 </View> 
               : <View style={styles.emptyView}>
                   <Image  style={styles.emptySign} source={require('../../assets/Icons/sign-icon.png')}/>
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
        Fetching: state.signCategory.Fetching ,
        data: state.signCategory.data ,
        error: state.signCategory.error,
        FetchingSigns: state.sign.FetchingSign ,
        signsData:  state.sign.signsData ,
        signsError: state.sign.signsError,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchSigns: (category) => dispatch(fetchSigns(category)),
        fetchSignCategories: () => dispatch(fetchSignCategories())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Signs);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    intro: {
        height : windowHeight * 0.25,
        width: windowWidth,
        backgroundColor: Colors.getColor('primaryColor'),
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center'
    },
    card: {
        width: 80, 
        height: 80,
        margin: 5
    },
    categoryIcons: {
        width: '100%',
        height: 60,
        resizeMode: 'contain',
    },
    introText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: Colors.getColor('cardBackground'),
        fontSize: 18,
        fontWeight: "bold",
    },
    listItemContainer: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.getColor('secondaryColor'),
        textAlign: 'center'
    },
    description: {
        marginLeft: 5,
        marginRight: 5,
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
        backgroundColor:  Colors.getColor('primaryColor'),
        marginTop: 5,
        padding: 5
    },
    errorMessage: {
        fontWeight: '600',
        
    }
})