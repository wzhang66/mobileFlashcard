import {RECEIVE_DECKS,ADD_DECK,REMOVE_DECK,SAVE_CARD_DECK} from '../actions/index';

export default function decks (state={},action){
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]:action.deck
            }
        case SAVE_CARD_DECK:
            return {
                ...state,
                [action.deckId]:{
                    ...state[action.deckId],
                    questions:state[action.deckId].questions.concat([action.card])
                }
            }
        case REMOVE_DECK:
            delete state[action.deckId];
            return {
                ...state
            }
        default:
            return state
    }   
}