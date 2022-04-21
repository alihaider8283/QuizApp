import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import CardView from 'react-native-cardview';
import Colors from '../../utility/colors/Colors';

const adUnitId = TestIds.REWARDED; //   __DEV__
// ?  TestIds.INTERSTITIAL
// : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';


const rewarded = RewardedAd.createForAdRequest('ca-app-pub-8187103578520437/7134682549');


class TestResult extends Component {
    state = {
        // result: [], //need to pass questions data
        result: this.props.route.params.result, //need to pass questions data
        count: 0
    }

    componentDidMount() {
// console.log('ads')
        rewarded.onAdEvent(type => {
            if (type === RewardedAdEventType.LOADED) {
                console.log('rewarded adLoaded');
                this.showAd();
            } else if (type === RewardedAdEventType.ERROR) {
                console.warn('rewarded => Error');
            } else if (type === RewardedAdEventType.OPENED) {
                console.log('rewarded => adOpened');
            } else if (type === RewardedAdEventType.CLICKED) {
                console.log('rewarded => adClicked');
            } else if (type === RewardedAdEventType.LEFT_APPLICATION) {
                console.log('rewarded => adLeft_App');
            } else if (type === RewardedAdEventType.CLOSED) {
                console.log('rewarded => adClosed');
                this.setState({
                    count: 1
                })
            }
        });

        rewarded.load();

    }

    showAd() {
        if (rewarded.loaded && this.state.count == 0) {
            rewarded.show().catch(error => console.warn(error));
        }
    }

    getListViewItem = (item) => {
        this.props.navigation.navigate('Report', {
            index: item.index
        });
    }

    renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={this.getListViewItem.bind(this, item)}
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 5,
                }}
            >
                <CardView
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: item.value == true ? Colors.getColor('green') : Colors.getColor('secondaryColor')
                    }}
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
        // console.log(this.props.route.params.result, 'result');
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.result}
                    renderItem={({ item }) => this.renderItem(item)}
                    numColumns={4}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

export default TestResult;

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
