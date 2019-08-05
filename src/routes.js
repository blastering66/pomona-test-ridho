import React from 'react'
import { View, Platform, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native'
import Welcome from './screens/Auth/Welcome'
import Service from './screens/Auth/Service'
import SignIn from './screens/Auth/Signin'
import Home from './screens/Home'
import Ionicons from 'react-native-vector-icons/Ionicons'
const ios = Platform.OS === 'ios'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

export default createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  SignIn: {
    screen: SignIn
  },
  Home: {
    screen: Home
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Welcome'
})
