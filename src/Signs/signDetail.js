import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import Colors from '../../utility/colors/Colors';
import { connect } from 'react-redux';
import { onReset, fetchSigns} from '../../store/Actions/Signs/sign';
import { BallIndicator } from 'react-native-indicators';
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Tts from "react-native-tts";

class SignDetail extends Component {
    
    selectedSign = null;

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,  
          sign: this.props.route.params.currentSign,
        };
      }

    componentDidMount () {
        this.selectedSign = this.props.data.filter(
            (x) => x.title == this.state.sign
        )
        this.setState({
            isLoading: false
        })

        Tts.getInitStatus().then(() => {
            Tts.setDefaultRate(0.40)
          });

          if(this.selectedSign[0].language){
            Tts.setDefaultLanguage('fr-FR')
            Tts.speak(this.selectedSign[0].description);
            Tts.speak(this.selectedSign[0].description2);
            Tts.speak(this.selectedSign[0].description3);
        } else {
            Tts.setDefaultLanguage('en-GB')
            Tts.speak(this.selectedSign[0].description);
            Tts.speak(this.selectedSign[0].description2);
            Tts.speak(this.selectedSign[0].description3);
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
                     : <View style={styles.container}>
                           <Image
                                style={styles.signImage}
                                source={{
                                uri: this.selectedSign[0].url,
                                }}
                            />
                            <Text style={styles.title}>{this.selectedSign[0].title}</Text>
                            <ScrollView>
                            <Text style={styles.description}>{this.selectedSign[0].description}</Text>
                            <Text style={styles.description2}>{this.selectedSign[0].description2}</Text>
                            <Text style={styles.description3}>{this.selectedSign[0].description3}</Text>
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
        Fetching: state.sign.FetchingSign ,
        data: state.sign.signsData,
        error: state.sign.signsError,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchSigns: () => dispatch(fetchSigns())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (SignDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.getColor('cardBackground')
    },
    signImage: {
        flex: 1,
        width: windowWidth,
        height: windowHeight * 0.35,
        resizeMode: 'contain',
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
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        textAlign: 'justify'
    },
    description2: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        textAlign: 'justify'
    },

    description3: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        textAlign: 'justify'
    }
})