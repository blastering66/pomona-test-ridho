import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native'
import { signout } from '../../store/actions/authActions'
import { Button } from '../../components'
import { connect } from 'react-redux'
import { COLORS } from '../../utils/res'
import styled from './styled'

type Props = {
  dispatch: dispatch
}

@connect((store)=>{
  return {
  }
})
class Home extends Component<Props> {
  componentDidMount() {
  }

  render() {
    return (
      <View style={[ styled.container, { justifyContent: 'center', alignItems: 'center' } ]}>
      </View>
    )
  }
}

export default Home
