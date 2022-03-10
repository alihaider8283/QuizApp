import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button, Image} from 'react-native';
import ClientLayer from '../../Components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';
import ReportView from './reportView';
import ProgressView from './progressView';
import CardView from 'react-native-cardview'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class Stats extends Component { 

    state = { 
         switcher: true
     }

     onPressSwitcher = () => {
         this.setState({
             switcher: !this.state.switcher
         })
     }

    render() { 
        return ( 
            <View  style={styles.container}>
                <View style={styles.tabContainer}>
                    {this.state.switcher 
                      ?  <ReportView navigation={this.props.navigation}/>
                      : <ProgressView/>
                      }
                </View>
                <View style={styles.switcher}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={()=> this.onPressSwitcher()}
                            color= {this.state.switcher ? '#C1272E' : '#E5878C' }
                            title="Report View"/>
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button 
                            onPress={()=> this.onPressSwitcher()}
                            color= {this.state.switcher ? '#E5878C' : '#C1272E' }
                            title="Progress view"/>
                    </View>
                </View>
            </View>
         );
    }
}
 
export default Stats;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabContainer: {
        flex: 1
    },
    switcher: {
        width: windowWidth,
        flexDirection: 'row',
        backgroundColor: Colors.getColor('secondaryColor'),
    },
    buttonContainer: {
        flex: 1,
      }
})