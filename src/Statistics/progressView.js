import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native';
import ClientLayer from '../../Components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';
import CardView from 'react-native-cardview'
import * as  Progress from 'react-native-progress';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ProgressView extends Component {
    state = { 
        result: null
     }

    componentDidMount() {
      ClientLayer.getInstance().getDataManager().GetValueForKey('stats', response => {
          if(response != null) {
             this.setState({
                 result: JSON.parse(response)
             })
          } 
      })
    }

    getListViewItem = (item) => {  
        // this.props.navigation.navigate('Series', {
        //     category: item.title
        // });
    }  

    renderItem = (item) => {
        console.log(item);
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
                        <Image  style={styles.categoryIcons} source={require('../../assets/Icons/stats-icon.png')}/>
                        <View  style={styles.textContainer}>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{item.category}</Text>
                            <Progress.Bar style={styles.description} color={Colors.getColor('green')}  progress={item.percentage} width={windowWidth - 100} />
                            <Text style={styles.progress} ellipsizeMode='tail' numberOfLines={1}>{item.percentage * 100} %</Text>
                        </View>
                    </View>
                </CardView>
          </TouchableOpacity>
    );
  }


    render() { 
        return ( 
            <View  style={styles.container}>
              { this.state.result != null
                  ? <View>
                        <FlatList  
                        style={styles.categories}
                        data={this.state.result.reverse()}  
                        renderItem={({item}) =>  this.renderItem(item) } 
                        keyExtractor={(item, index) => index.toString()}
                        /> 
                    </View> 
                  : <View style={styles.emptyView}>
                    </View>  
               }
            </View>
         );
    }
}
 
export default ProgressView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    card: {
        width: windowWidth, 
        height: 50,
        justifyContent: 'center',
        marginBottom: 1,
    },
    categoryIcons: {
        width: 50,
        height: '100%',
        resizeMode: 'contain',
        marginLeft: 15,
    },
    introText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: Colors.getColor('cardBackground'),
        fontSize: 18,
        fontWeight: "bold",
    },
    listItemContainer: {
        flexDirection: 'row'
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
        marginBottom: 4
    },
    description: {
        
    },
    emptyCategory: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 15
    },
    emptyView: {
        justifyContent: "center",
        alignItems: 'center'
    },
    date: {
     top: 0,
     right: 10,
     resizeMode: 'contain',
     position: 'absolute'
    },
    questions: {
     bottom: 0,
     right: 10,
     resizeMode: 'contain',
     position: 'absolute'
    }, 
    progress: {
        top: 0,
        right: 10,
        resizeMode: 'contain',
        position: 'absolute'
       },
})