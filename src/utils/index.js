import { Dimensions } from 'react-native'
import Application from './Application'
import Satellite from './Satellite'
import NavigationActions from './NavigationActions'
import LocalStorage from './LocalStorage'

module.exports = {
  Application,
  Satellite,
  NavigationActions,
  LocalStorage,
  DeviceWidth: Dimensions.get('window').width,
  DeviceHeight: Dimensions.get('window').height
}
