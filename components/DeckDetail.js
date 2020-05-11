import React,{Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { getDeck } from '../utils/helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { red } from '../utils/color';

class DeckDetails extends Component {
    state={
        title:'',
        questions: [],
        ready: false
    }
    
    
    setTitle = (deckTitle) => {
        this.props.navigation.setOptions({
            title: `${deckTitle} Deck`
        })
    }

    componentDidMount(){
        const{title} = this.props.route.params;
        getDeck(title).then(deck=>{
            const receiveDeck = JSON.parse(deck);
            this.setState(()=>({
            title: receiveDeck.title,
            questions: receiveDeck.questions,
            ready: true
        })
        )}
        )
    }

    deleteHandler = () => {
        this.props.navigation.navigate(
            'Home'
        );
        console.log('deleting');
        AsyncStorage.removeItem(this.state.title)
    }

    render(){
        const {title} = this.props.route.params;
        this.setTitle(title);
        if(!this.state.ready) {
            return(
                <ActivityIndicator />
            )
        }
        const {questions} = this.state;
        
        return(
            <View>
                <Text>
                    {title}
                </Text>
                <Text>
                    {questions.length} cards
                </Text>

                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate(
                        'NoCard'
                    )}>
                    <Text>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deleteHandler}>
                    <Text style={{color:red}}>
                        Delete Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DeckDetails;