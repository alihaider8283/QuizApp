import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const renderData = (props) => {
    console.log(props.item,'label');
    switch (props.status) {
        case 0:
            return (
                <RadioButtonRN
                    data={props.item}
                    boxStyles={styles.boxStyles}
                    // box={true}
                    selectedBtn={(e) => props.onRadioButtonSelected(e)}
                    circleSize={16}
                />
            )

        case 1:
            return (
                <View
                    pointerEvents="none"
                >
                    <RadioButtonRN
                        data={props.item}
                        boxStyles={styles.boxStyles}
                        activeColor='#008000'
                        box={true}
                        initial={props.initialSelection}
                        circleSize={16}
                    />
                </View>
            )
        case 2:
            return (
                <View
                    pointerEvents="none"
                >
                    <RadioButtonRN
                        data={props.item}
                        boxStyles={styles.boxStyles}
                        activeColor='#C1272E'
                        box={true}
                        initial={props.initialSelection}
                        selectedBtn={(e) => props.onRadioButtonSelected(e)}
                        circleSize={16}
                    />
                </View>
            )
    }
}


const SingleAnswersView = (props) => {
    return (
        <View style={styles.card}>
            {renderData(props)}
        </View>
    )
}

export default SingleAnswersView

const styles = StyleSheet.create({
    boxStyles: {
        // width: windowWidth *0.8,
        marginLeft: 10,
        marginRight: 10,
        height: 30
    },
    card: {
        // width: windowWidth *0.8,
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: 'red'
    },


})