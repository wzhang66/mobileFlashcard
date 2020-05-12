import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { red,green, white } from '../utils/color';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';



class Quiz extends Component{
    state={
        questionIndex: 0,
        correctAnswer: 0,
        completestatus: false,
        showAnwer: false,
    }

    setTitle = (deckTitle) => {
        this.props.navigation.setOptions({
            title: deckTitle
        })
    }

    toggleShowAnswer = () =>{
        this.setState((state)=>({
            showAnwer:!state.showAnwer
        }))
    }

    correctHandler = () =>{
        const {questionIndex} = this.state
        if(this.checkComplete(questionIndex)){
            this.setState((state)=>({
                questionIndex: state.questionIndex + 1,
                correctAnswer: state.correctAnswer + 1,
                completestatus: true
            }))
        } else {
            this.setState((state)=>({
                questionIndex: state.questionIndex + 1,
                correctAnswer: state.correctAnswer + 1
            }))
        }
    }

    wrongHandler = () => {
        const {questionIndex} = this.state
        if(this.checkComplete(questionIndex)){
            this.setState((state)=>({
                questionIndex: state.questionIndex + 1,
                completestatus: true
            }))
        } else {
            this.setState((state)=>({
                questionIndex: state.questionIndex + 1,
            }))
        }
    }

    checkComplete = (index) => {
        const {questions} = this.props.deck;
        if(index+1<questions.length){
            return false
        } else {
            return true
        }
    }

    resetQuiz=() => {
        this.setState({
            questionIndex: 0,
            correctAnswer: 0,
            completestatus: false,
            showAnwer: false,
        })
    }

    resetLocalNotification = () => {
        clearLocalNotification().then(setLocalNotification)
    }

    render() {
        const {questions} = this.props.deck;
        if(this.props.deck.questions.length === 0){
            return this.noCardRendering();
        } else if(!this.state.completestatus){
            return this.startQuiz(questions)
        } else {
            return this.showScore();
        }
    }

    noCardRendering = () => {
        const {title} = this.props.deck;
        this.setTitle(`${title} Deck`);
        return(
        <View style={styles.containers}>
            <Text style={styles.text} >
                Sorry, you cannot take a quiz because there are no cards in the deck.
            </Text>
        </View>
    )}

    startQuiz = (questions) => (
        <View style={{flex:1}}>
            <Text style={{fontSize:20}}>{this.state.questionIndex+1}/{questions.length}</Text>
            <View style={styles.containers}>
                <Text style={styles.text}>{
                    this.state.showAnwer ? questions[this.state.questionIndex].answer
                        : questions[this.state.questionIndex].question
                }</Text>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={this.toggleShowAnswer}
                    >
                    <Text style={{fontSize:15,color:red}}>{this.state.showAnwer ? 'Show Question' : 'Show Answer' }</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.correctHandler}
                    style={styles.correctButton} >
                    <Text style={{fontSize:20,color:white}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.wrongHandler}
                    style={styles.wrongButton} >
                    <Text style={{fontSize:20,color:white}}>Wrong</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
    Content
    showScore = () => {
        this.setTitle('Score');
        this.resetLocalNotification();
        return(
        <View style={styles.containers}>
            <Text style={styles.text}>
                Your Score is {this.state.correctAnswer} out of {this.state.questionIndex}
            </Text>
            <TouchableOpacity
                style={styles.goHomeButton}
                onPress={this.resetQuiz} >
                <Text style={{fontSize:15}}>Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.goHomeButton}
                onPress={()=>this.props.navigation.goBack()} >
                <Text style={{fontSize:15}}>Go back to Deck</Text>
            </TouchableOpacity>
        </View>
    )}
} 

const mapStateToProps = (decks, {route}) => {
    const id = route.params.deckId;
    return{
        deck: decks[id]
    }
}

export default connect(mapStateToProps)(Quiz);


const styles = StyleSheet.create({
    containers:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:30,
        textAlign:'center'
    },
    toggleButton:{
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    correctButton:{
        backgroundColor:green,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    wrongButton:{
        backgroundColor:red,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    goHomeButton:{
        backgroundColor:white,
        borderColor:"#000",
        borderWidth:2,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    }

})