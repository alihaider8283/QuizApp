import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native';
import ClientLayer from '../../Components/Layers/ClientLayer';
import Colors from '../../utility/colors/Colors';
import CardView from 'react-native-cardview'
import { StackActions } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ReportView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: null
        };
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
        this.props.navigation.navigate('ReportGrid', {
            result: item.result,
            category: item.category,
            series: item.series
        });
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
                            <Text style={styles.description} ellipsizeMode='tail' numberOfLines={2}>Séries {item.series}</Text>
                            <Text style={styles.date} ellipsizeMode='tail' numberOfLines={1}>{item.date}</Text> 
                            <Text style={styles.questions} ellipsizeMode='tail' numberOfLines={1}>Nombre total de questions {item.questionsCount}</Text> 

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
 
export default ReportView;

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
    }
})