import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const renderLabel = (label, style) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
            <View >
                <Text style={style}>{label}</Text>
            </View>
        </View>
    )
}

const MultipleAnswersView = (props) => {
    console.log('props', props);
    return (
        <View style={styles.container}>
            {props.disable
                ?
                props.item.map((item, index) => {
                    return (
                        <View key={index} style={styles.OptionContainer}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="#1597E5"
                                unfillColor="#FFFFFF"
                                text={item.label}
                                iconStyle={{ borderColor: "#32C1CD" }}
                                isChecked={item.check}
                                textStyle={{
                                    textDecorationLine: "none",
                                }}
                                onPress={(value) => { props.onCheckBoxesSelected(item) }}
                            />
                        </View>
                    )
                })


                : <View
                    pointerEvents="none"
                >
                    {
                        props.item.map((item, index) => {
                            return (
                                <View key={index} style={styles.OptionContainer}>
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor="#1597E5"
                                        unfillColor="#FFFFFF"
                                        text={item.label}
                                        iconStyle={{ borderColor: "#32C1CD" }}
                                        isChecked={item.check}
                                        textStyle={{
                                            textDecorationLine: "none",
                                        }}
                                    // onPress={(value) => { props.onCheckBoxesSelected(item) }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            }
        </View>
    )

}

export default MultipleAnswersView

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginTop: 10,
    },
    OptionContainer: {
        width: '95%',
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 10,
        marginTop: 0,
        elevation: 5,
        borderRadius: 5,
    }
})