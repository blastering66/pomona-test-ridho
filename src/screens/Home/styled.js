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
  container_row: {
    flexDirection: 'column',
    backgroundColor: COLORS.colorWhite,
    padding: 10,
    marginBottom: 15
  },
  row_title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    letterSpacing: 2,
    padding: 5
  },
  row_note: {
    fontSize: 16,
    color: '#000',
    fontWeight: '100',
    letterSpacing: 1,
    padding: 5
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
