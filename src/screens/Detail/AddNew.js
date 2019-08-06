import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform, StyleSheet, TouchableOpacity, ActivityIndicator, SectionList, TouchableWithoutFeedback } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
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

class AddNew extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  render() {
    // const {  } = this.state
    return (
      <View style={[ styled.container, { justifyContent: 'center', alignItems: 'center', paddingTop: 20 } ]}>
      </View>
    )
  }
}

export default AddNew
