import React, { Component } from 'react';
import { BallIndicator } from 'react-native-indicators';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native';
import { connect } from 'react-redux';
import { onReset, fetchCategories} from '../../store/Actions/Category/category';
import CardView from 'react-native-cardview'
import Colors from '../../utility/colors/Colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        };
      }

   componentDidMount() {
       this.props.fetchCategories();
   }

  
    getListViewItem = (item) => {  
        this.props.navigation.navigate('Series', {
            category: item.title
        });
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
                        <Image  style={styles.categoryIcons} source={require('../../assets/Icons/category-icon.png')}/>
                        <View  style={styles.textContainer}>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.description} ellipsizeMode='tail' numberOfLines={2}>{item.description}</Text>
                        </View>
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
                            <Text style={styles.introText}>Sélectionnez votre</Text>
                            <Text style={styles.introText}>Catégorie préférée</Text>
                        </View> 
                        <FlatList  
                        style={styles.categories}
                        data= {this.props.data}  
                        renderItem={({item}) =>  this.renderItem(item) } 
                        /> 
                    </View> 
                  : <View style={styles.emptyView}>
                      <Image  style={styles.emptyCategory} source={require('../../assets/Icons/category-icon.png')}/>
                      <Text>{this.props.error}</Text> 
                    </View>  
               }
            </View>
         );
    }
}

// Mapping States To Props
const mapStateToProps = (state) => {
    return {
        Fetching: state.category.Fetching ,
        data: state.category.data,
        error: state.category.error,
    }
}

// Mapping Dispatches to Props
const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(onReset()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Categories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        height : windowHeight * 0.25,
        backgroundColor: Colors.getColor('primaryColor'),
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center'
    },
    card: {
        width: windowWidth - 60, 
        height: 100,
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    categories: {
        marginTop:  -30
    },
    categoryIcons: {
        width: 50,
        height: '100%',
        resizeMode: 'contain',
        marginLeft: 15
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
    }
})