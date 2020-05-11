import {AsyncStorage} from 'react-native';

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getDecks () {
    return AsyncStorage.getAllKeys()
        .then((keys)=>AsyncStorage.multiGet(keys))
        .then((results)=>{
            let decksretrive = {}
            results.map((result, i, store)=>{
                let key = store[i][0]
                let value = store[i][1]
                decksretrive = {
                    ...decksretrive,
                    [key]:JSON.parse(value)
                }
            })
            return decksretrive
        })
} 

export function saveDeckTitle (title){
    const newDeck = {
        title: title,
        questions: [],
    }
    AsyncStorage.setItem(title, JSON.stringify(newDeck))
        .then(AsyncStorage)
}

export function getDeck (title) {
    return AsyncStorage.getItem(title)
}