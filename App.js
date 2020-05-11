import React,{Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import Constants from 'expo-constants';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetail';
import NoCardPage from './components/NoCardsPage';
import { purple, white } from './utils/color';


function MobileStatusBar ({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height:Constants.statusBarHeight}} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator()

const RouteConfigs = {
  Decks:{
    name:'Decks',
    component: Decks,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Decks'},
  },
  AddDeck:{
    component: AddDeck,
    name: "Add Deck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav = () =>(
  <Tabs.Navigator {...TabNavigatorConfig}>
    <Tabs.Screen {...RouteConfigs['Decks']}/>
    <Tabs.Screen {...RouteConfigs['AddDeck']}/>
  </Tabs.Navigator>
)

const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator headerMode="screen">
    <Stack.Screen 
      name="Home"
      component={TabNav}
      options={{headerShown:false}} />
    <Stack.Screen 
      name="DeckDetails"
      component={DeckDetails}
      options={{
        headerTintColor: white,
        headerStyle:{
          backgroundColor:purple
        }
      }} />
    <Stack.Screen 
      name="NoCard"
      component={NoCardPage}
      options={{
        headerTintColor: white,
        headerStyle:{
          backgroundColor:purple
        }
      }} />
    
  </Stack.Navigator>
)

export default class App extends Component{
  render(){
    return (
      <View style={styles.container}>
        {/* <Home /> */}
        {/* <AddDeck /> */}
        <NavigationContainer>
          <MobileStatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNav />
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
