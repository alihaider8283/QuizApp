import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchCoursesCategory} from '../../store/Actions/CourseCategories/categories';
import { BallIndicator } from 'react-native-indicators';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CourseCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true
        };
      }

    componentDidMount() {
        this.props.fetchCoursesCategory();
    }

    getListViewItem = (item) => {  
        this.props.navigation.navigate('Course', {
            category : item.title
        });
    }

    onPressTryAgain = () => {
         this.props.fetchCoursesCategory();
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
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 20, fontSize:20, color: Colors.getColor('secondaryColor')}}>{item.title}</Text>
                        <Image style={{width: 30, height: 30, right: 20, position: 'absolute', resizeMode: 'contain'}}  source={require('../../assets/Icons/right_arrow.png')}  />
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
               ? <View style={{marginTop: 50}}>
                     <FlatList  
                     style={styles.courses}
                     data={this.props.data}  
                     renderItem={({item}) =>  this.renderItem(item) } 
                     /> 
                 </View> 
               : <View style={styles.emptyView}>
                   <Image  style={styles.emptySign} source={require('../../assets/Icons/course-icon.png')}/>
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
        Fetching: state.courseCategory.Fetching ,
        data: state.courseCategory.data,
        error: state.courseCategory.error,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchCoursesCategory: () => dispatch(fetchCoursesCategory())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (CourseCategory);

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
        width: windowWidth, 
        height: 50,
        justifyContent: 'center',
    },
    courseImage: {
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
    textContainer: {
        marginLeft: 15,
        flex: 1,
        marginRight: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.getColor('secondaryColor'),
    },
    description: {
        margin: 5,
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