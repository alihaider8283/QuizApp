import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchSigns} from '../../store/Actions/Signs/sign';
import { BallIndicator } from 'react-native-indicators';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true
        };
      }

    componentDidMount() {
        this.props.fetchSigns();
    }

    getListViewItem = (item) => {  
        this.props.navigation.navigate('SignDetail', {
            currentSign : item.title
        });
    }

    onPressTryAgain = () => {
         this.props.fetchSigns();
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
                        <View style={styles.listItemContainer}>
                            <FastImage
                                style={styles.categoryIcons}
                                source={{
                                uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
                                }}
                                onLoadStart={() => { this.setState({ loading: true })} }
                                onLoadEnd={() => { this.setState({ loading: false })} }
                            >
                            <ActivityIndicator animating={ this.state.loading }  />
                            </FastImage>
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
               ? <View>
                     <View style={styles.intro}>
                         <Text style={styles.introText}>Select Your</Text>
                         <Text style={styles.introText}>Favorite Signs</Text>
                     </View> 
                     <FlatList  
                     style={styles.signs}
                     data={this.props.data}  
                     renderItem={({item}) =>  this.renderItem(item) } 
                     numColumns={2}
                     /> 
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
        Fetching: state.sign.Fetching ,
        data: state.sign.data,
        error: state.sign.error,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchSigns: () => dispatch(fetchSigns())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Sign);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: windowWidth * 0.45, 
        height: 200,
        marginBottom: 10,
        marginLeft: windowWidth * 0.015,
        marginRight: windowWidth * 0.015
    },
    signs: {
        marginTop:  -30,
        marginLeft: 8,
        marginRight: 8
    },
    categoryIcons: {
        width: '100%',
        height: 120,
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
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.getColor('secondaryColor'),
        margin: 5
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