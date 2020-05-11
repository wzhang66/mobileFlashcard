import React,{ Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import { white, purple } from '../utils/color';
import {saveDeckTitle} from '../utils/helpers';

function SubmitBtn ({onPress, ...props}) {
    return(
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress} {...props} >
            <Text style={styles.submitBtnText}>submit</Text>
        </TouchableOpacity>
    )
}


class AddDeck extends Component {
    state ={
        DeckName:'',
    }

    DeckNameChange = (text) => {
        this.setState(()=>({
            DeckName: text
        }))
    }
    
    submitHandler = () =>{
        saveDeckTitle(this.state.DeckName);
        this.setState(()=>({
            DeckName:''
        }))
        this.toHome()

    }
    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key: "AddDeck"
        }))
    }

    render(){
        return(
            <View>
                <Text>
                    Add a new Deck
                </Text>
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 2, padding:10}}
                    onChangeText={(text)=>this.DeckNameChange(text)}
                    value={this.state.DeckName}
                    placeholder='Input the name of new Deck' />
                <SubmitBtn onPress={this.submitHandler} disabled={this.state.DeckName.length === 0} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems:"center"
    },
    iosSubmitBtn: {
        backgroundColor:purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40
    },
    androidSubmitBtn: {
        backgroundColor:purple,
        padding:10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color:white,
        fontSize:22,
        textAlign: 'center'
    },
    center: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 30,
        marginRight: 30,

    },
})


export default AddDeck;
