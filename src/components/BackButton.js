import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { COLORS } from '../utils/res'
import Ionicons from 'react-native-vector-icons/Ionicons'

class BackButton extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    callback: PropTypes.func
  }

  render() {
    return (
      <View
        {...this.props}
        style={[ styles.container, { ...this.props.style } ]}>
        <TouchableOpacity {...this.props}>
          <View style={{ width: 40, heigth: 40, marginLeft: 20 }}>
            <Ionicons name={'md-arrow-back'} color={COLORS.colorWhite} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
})

export default BackButton
