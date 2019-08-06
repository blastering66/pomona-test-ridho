import { StyleSheet } from 'react-native'
import { COLORS } from '../../utils/res'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bbabb'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 3
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 2
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: 5,
    color: COLORS.textWhite,
    fontSize: 18,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  }
})
