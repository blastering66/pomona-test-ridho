import { Platform } from 'react-native'

const ios = Platform.OS === 'ios'

module.exports = {
  VALUES: {
    step: 1
  },
  COLORS: {
    actionBarColor: '#652D90',
    colorAppTheme: '#1A9B80',
    colorBackground: '#E9E9EF',
    colorWhite: '#fff',
    colorGreen: '#1a9b80',
    text: '#464159',
    textGray: '#808082',
    textGreen: '#1a9b80',
    lineGray: '#CCCECF',
    lineGraySoft: '#dddddd',
    title: '#652D90',
    subtitle: '#92a4bf',
    trans: 'transparent',
    borderButton: '#259A7F',
    button: '#0fb3e3',
    textWhite: '#fff',
    textBlack: '#000',
    buttonDark: '#0fb3e3'
  },
  DIMENS: {
    paddingIcon: 5,
    paddingSmall: 5,
    paddingMedium: 10,
    iconSize: 30,
    fontSmall: 10,
    fontMedium: 13,
    fontBig: 15
  }
}
