import React,{ Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import { white, purple } from '../utils/color';
import {saveDeckTitle} from '../utils/helpers';
import { connect } from 'react-redux';
import { addDeckHandler } from '../store/actions';

function SubmitBtn ({onPress, ...props}) {
    return(
        <TouchableOpacity
            style={styles.androidSubmitBtn}
            onPress={onPress} {...props} >
            <Text style={styles.submitBtnText}>Create Deck</Text>
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
        
        this.props.dispatch(addDeckHandler(this.state.DeckName))
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
            <View style={styles.container}>
                <Text style={styles.title}>
                    What is the title of your new deck?
                </Text>
                <TextInput 
                    style={styles.inputFrame}
                    onChangeText={(text)=>this.DeckNameChange(text)}
                    value={this.state.DeckName}
                    placeholder='Enter Title' />
                <SubmitBtn onPress={this.submitHandler} disabled={this.state.DeckName.length === 0} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    title:{
        fontSize:30,
        textAlign:"center",
        paddingBottom:20
    },  
    inputFrame:{
        width: 300,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 2, 
        padding:10,
        margin:10
    },

    androidSubmitBtn: {
        backgroundColor:purple,
        padding:10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color:white,
        fontSize:22,
        textAlign: 'center'
    },
})


export default connect()(AddDeck);
