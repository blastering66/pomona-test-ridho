import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { View, Text, Image, Platform, StyleSheet, TouchableHighlight} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from './Home';
import ProfileScreen from './Profile';

const RootTabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={'md-home'} color={focused ? tintColor : '#dddd'} size={30} style={styles.tabIcon}/>
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={'md-contact'} color={focused ? tintColor : '#dddd'} size={30} style={styles.tabIcon}/>
      )
    }
  }
})

const ios = Platform.OS === 'ios'
// import strings from './utils/multilangstring'
const styles = StyleSheet.create({
  tabIcon: {
    width: 50,
    height: 50,
    top: 10,
    left: 12
  }
})

export default createStackNavigator({ RootTabs }, { headerMode: 'none' })
