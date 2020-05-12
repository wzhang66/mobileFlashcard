import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const FLASHCARDS_DATA_KEY = "flashcards_data";
const FLASHCARDS_NOTIFICATION_KEY = "flashcards_notification";

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

// Handle notification
export function clearLocalNotification () {
    console.log("clearing");
    return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
      .then(Notifications.cancelScheduledNotificationAsync)
}

function createNotification () {
    return{
        title:'Take your quiz today',
        body: 'Do not forget to take at least one quiz today',
        ios:{
            sound:true,
        },
        android: {
            sound: true,
            priority: 'hight',
            sticky: false,
            vibrate: true
        }

    }
}
export function setLocalNotification () {
    AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data)=>{
        console.log(data)
        if(data === null ){
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status})=>{
                console.log(status)
              if(status === 'granted'){
                Notifications.cancelScheduledNotificationAsync();
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20);
                tomorrow.setMinutes(30);
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                );
                console.log("finish reseting")
                AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }