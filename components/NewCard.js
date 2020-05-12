import React,{Component} from 'react';
import {View, TextInput, StyleSheet,Text} from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { saveCardDeckHandler } from '../store/actions';
import { white } from '../utils/color';

class NewCards extends Component {
    state={
        question:'',
        answer:''
    }
    setTitle = (deckTitle) => {
        this.props.navigation.setOptions({
            title: `Add New Card to ${deckTitle} Deck`
        })
    }

    submitHandler = () =>{
        const {deck,dispatch} = this.props;
        const newCard = {...this.state}
        dispatch(saveCardDeckHandler(deck.id,newCard))
        this.props.navigation.goBack();
    }

    render(){
        const {deck} =this.props;
        this.setTitle(deck.title)
        const {question, answer} = this.state; 
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputFrame}
                    onChangeText={(text)=>this.setState({question: text})}
                    value={question}
                    placeholder='Question' />
                <TextInput 
                    style={styles.inputFrame}
                    onChangeText={(text)=>this.setState({answer: text})}
                    value={answer}
                    placeholder='Answer' />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.submitHandler}
                    disabled={question.length===0 || answer.length===0}
                    >
                    <Text style={{color:white, fontSize:20}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (decks,{route}) =>{
    const id = route.params.deckId;
    return{
        deck:decks[id]
    }
}

export default connect(mapStateToProps)(NewCards);

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    inputFrame:{
        width: 300,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 2, 
        padding:10,
        margin:10
    },
    submitBtn:{
        backgroundColor:"#000",
        borderColor:"#000",
        borderWidth:2,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    }
})