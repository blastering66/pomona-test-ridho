import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, Image, Platform, StyleSheet, TouchableHighlight} from 'react-native'
import AddNew from './AddNew';
import Todo from './Todo';

export default createStackNavigator({
  AddNew: {
    screen: AddNew
  },
  Todo: {
    screen: Todo
  }
}, {
  headerMode: 'none'
})
