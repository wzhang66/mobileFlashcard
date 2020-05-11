import React,{Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { red } from '../utils/color';
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
            <View>
                <Text>
                    {deck.title}
                </Text>
                <Text>
                    {deck.questions.length} cards
                </Text>

                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate(
                        'NoCard'
                    )}>
                    <Text>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.deleteHandler(deck.id)}>
                    <Text style={{color:red}}>
                        Delete Deck
                    </Text>
                </TouchableOpacity>
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