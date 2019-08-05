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
        <Ionicons name={'md-home'} color={focused ? 'blue' : '#dddd'} style={styles.tabIcon}/>
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name={'md-home'} color={focused ? 'blue' : '#dddd'} style={styles.tabIcon}/>
      )
    }
  }
})

const ios = Platform.OS === 'ios'
// import strings from './utils/multilangstring'
const styles = StyleSheet.create({
  tabIcon: {
    width: ios ? 28 : 28,
    height: ios ? 28 : 28,
    top: ios ? 1 : 5
  }
})

export default createStackNavigator({ RootTabs }, { headerMode: 'none' })
