import React,{Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { red, white } from '../utils/color';
import { connect } from 'react-redux';
import { removeDeckHandler } from '../store/actions';

class DeckDetails extends Component {
    setTitle = (deckTitle) => {
        this.props.navigation.setOptions({
            title: `${deckTitle} Deck`
        })
    }

    deleteHandler = (deckId) => {
        this.props.navigation.navigate(
            'Home'
        );
        this.props.dispatch(removeDeckHandler(deckId))
        console.log('deleting', deckId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        return nextProps.deck !== undefined
    }

    render(){
        const {deck} = this.props;
        this.setTitle(deck.title);        
        return(
            <View style={styles.container}>
                <View style={styles.deckInfo}>
                    <Text style={{textAlign:'center', fontSize:30}}>
                        {deck.title}
                    </Text>
                    <Text style={{textAlign:'center'}}>
                        {deck.questions.length} cards
                    </Text>
                </View>
                
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={styles.buttonWhite} 
                        onPress={()=>this.props.navigation.navigate(
                            'NoCard'
                        )}>
                        <Text style={{fontSize:20}}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonBlack}
                        onPress={()=>this.props.navigation.navigate(
                            'NewCard'
                        )}>
                        <Text style={{color:white,fontSize:20}}>
                            Add Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonNone}
                        onPress={()=>this.deleteHandler(deck.id)}>
                        <Text style={{color:red,fontSize:20}}>
                            Delete Deck
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (decks,{route}) => {
    const id = route.params.deckId
    return {
        deck:decks[id]
    }
}

export default connect(mapStateToProps)(DeckDetails);

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    deckInfo:{
        // justifyContent:'center'
        paddingTop:40
    },
    buttons:{
        alignItems:"center",
        padding:40
    },
    buttonWhite:{
        backgroundColor:white,
        borderColor:"#000",
        borderWidth:2,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    buttonBlack:{
        backgroundColor:"#000",
        borderColor:"#000",
        borderWidth:2,
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    },
    buttonNone:{
        width: 160,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    }

})