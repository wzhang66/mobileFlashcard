import React,{Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import { getDecks } from '../utils/helpers';
import { purple } from '../utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Decks extends Component {
    state={
        decks:{},
        ready:false
    }

    componentDidMount(){
        getDecks()
            .then((retrieveCards)=>this.setState((state)=>({
                ...state,
                decks:retrieveCards,
                ready: true
            }))) 
    }

    render(){
        if(!this.state.ready){
            return <ActivityIndicator style={{marginTop: 30}} />
        }
        const decksList = Object.keys(this.state.decks);
        return(
            <ScrollView>
            <View style={styles.container}>
                {decksList.map((deck)=>(
                    <View key={deck} style={styles.deck}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate(
                            'DeckDetails',
                            {title:deck}
                        )}>
                            <Text style={[styles.deckText, {fontSize:25}]}>{this.state.decks[deck].title}</Text>
                            <Text style={styles.deckText}>{this.state.decks[deck].questions.length} cards</Text>
                        </TouchableOpacity> 
                    </View>
                ))}
            </View>
            </ScrollView>
        )
    }
}

export default Decks;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    deck: {
        width: 300,
        height: 100,
        borderColor:purple,
        borderWidth: 3,
        margin: 20,
        borderRadius: 10,
        justifyContent:'center'
    },
    deckText :{
        textAlign:"center",
    }

})