import { getDecks, saveDeckTitle, saveDeckCard, deleteDeck } from '../../utils/helpers';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const SAVE_CARD_DECK = 'SAVE_CARD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export function receiveDecksHandler(){
    return(dispatch)=>{
        return getDecks()
            .then((decks)=>dispatch(receiveDecks(decks)))
    }
}

export function addDeckHandler(title){
    return (dispatch)=>{
        return saveDeckTitle(title)
            .then((deck)=>dispatch(addDeck(deck)))
    }
}

export function saveCardDeckHandler(deckId,card){
    return (dispatch) =>{
        return saveDeckCard(deckId, card)
            .then(()=>dispatch(saveCardDeck(deckId,card)))
    }
}

export function removeDeckHandler(deckId){
    return(dispatch)=>{
        return deleteDeck(deckId)
            .then(()=>dispatch(removeDeck(deckId)))
    }
}

function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck (deck){
    return {
        type: ADD_DECK,
        deck
    }
}

function saveCardDeck(deckId, card){
    return{
        type: SAVE_CARD_DECK,
        deckId,
        card
    }
}

function removeDeck(deckId){
    return{
        type:REMOVE_DECK,
        deckId
    }
}