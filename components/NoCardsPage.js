import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function noCardsPage () {
    return (
        <View style={styles.containers}>
            <Text style={styles.text} >
                Sorry, you cannot take a quiz because there are no cards in the deck.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containers:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        padding: 70,
    },
    text:{
        fontSize:20,
        textAlign:'center'
    }
})