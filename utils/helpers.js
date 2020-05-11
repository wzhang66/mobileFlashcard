import {AsyncStorage} from 'react-native';

const FLASHCARDS_DATA_KEY = "flashcards_data"

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function initialData(){
    return{
        "12foptgscqch8io3qy7tc":{
            id:"12foptgscqch8io3qy7tc",
            title:'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              }
            ],
        },
        "m6rkcqx42m7wy73dfb1hv":{
            id:"m6rkcqx42m7wy73dfb1hv",
            title:'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ],
        }
    }
}

export async function getDecks () {
    try {
        const allDecks = await AsyncStorage.getItem(FLASHCARDS_DATA_KEY);
        if(allDecks) {
            const decks = JSON.parse(allDecks);
            return decks;
        } else {
            await AsyncStorage.setItem(FLASHCARDS_DATA_KEY,JSON.stringify(initialData()));
            return initialData();
        }
        
    } catch (error) {
        await AsyncStorage.setItem(FLASHCARDS_DATA_KEY,JSON.stringify(initialData()));
        return initialData();
    }
} 

export async function saveDeckTitle (title){
    const newId = generateUID();
    const newDeck = {
        id: newId,
        title: title,
        questions: [],
    }

    await AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY, JSON.stringify(
        {[newId]:newDeck}
    ));
    return newDeck
}

export async function saveDeckCard (deckId,card){
    const deckData = await AsyncStorage.getItem(FLASHCARDS_DATA_KEY);
    if(deckData) {
        const decksInfo = JSON.parse(deckData);
        const deckUpdate = decksInfo[deckId];
        deckUpdate.questions = deckUpdate.questions.concat([card]);
        await AsyncStorage.mergeItem(FLASHCARDS_DATA_KEY,JSON.stringify(
            {[deckId]:deckUpdate}
        ));
        return deckUpdate
    }
    return {};
}

export async function deleteDeck (deckId) {
    const results = await AsyncStorage.getItem(FLASHCARDS_DATA_KEY);
    if(results){
        const parseData = JSON.parse(results);
        delete parseData[deckId];
        await AsyncStorage.setItem(FLASHCARDS_DATA_KEY,JSON.stringify(parseData));
        return parseData;
    }
    return {};
}