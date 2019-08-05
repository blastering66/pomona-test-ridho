import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { COLORS } from '../utils/res'

class Button extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    buttonTextColor: PropTypes.string
  }

  render() {
    return (
      <View
        {...this.props}
        style={[ styles.container, { ...this.props.style } ]}>
        <TouchableOpacity {...this.props} style={{ backgroundColor: 'transparent' }}>
          <View style={[ styles.button, { backgroundColor: 'white'}]}>
            <Text style={[ styles.label, { color: this.props.buttonTextColor }]}>
              {this.props.buttonText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 2
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.colorWhite,
    borderRadius: 25
  }
})

export default Button
