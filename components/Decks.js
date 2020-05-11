import React,{Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import { purple } from '../utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { receiveDecksHandler } from '../store/actions';

class Decks extends Component {
    state={
        ready:false
    }

    componentDidMount(){
        this.props.dispatch(receiveDecksHandler())
            .then(()=>{
                this.setState({
                    ready:true
                })
            })
        
        
    }

    render(){
        if(!this.state.ready){
            return <ActivityIndicator style={{marginTop: 30}} />
        } else {
        const {decks} = this.props;
        const decksList = Object.keys(decks)
        return(
            <ScrollView>
                <View style={styles.container}>
                    {decksList.map((deck)=>(
                        <View key={deck} style={styles.deck}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate(
                                'DeckDetails',
                                {deckId: deck}
                            )}>
                                <Text style={[styles.deckText, {fontSize:25}]}>{decks[deck].title}</Text>
                                <Text style={styles.deckText}>{decks[deck].questions.length} cards</Text>
                            </TouchableOpacity> 
                        </View>
                    ))}
                </View>
            </ScrollView>
        )}
    }
}

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks);

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