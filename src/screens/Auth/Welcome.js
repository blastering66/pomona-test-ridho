import React, { Component } from 'react'
import { View, Platform, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Satellite, NavigationActions } from '../../utils'
import { COLORS } from '../../utils/res'
import { Button } from '../../components'
import { ENDPOINT } from '../../utils/config'
import { authenticated } from '../../store/actions/authActions'
import styled from './styled'

type Props = {
  dispatch: dispatch
}

@connect((store) => {
  return {
    user: store.authData.user
  }
})

export default class Welcome extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  goToSignIn() {
    this.props.navigation.navigate('SignIn')
  }

  goToRegister() {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={styled.container}>
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', paddingVertical: 30, alignItems: 'center' }}>
          <Text style={[styled.title, { textAlign: 'center' }]}>Welcome</Text>
          <Text style={[styled.title, { padding: 10, textAlign: 'center' }]}>to</Text>
          <Text style={[styled.title, { textAlign: 'center' }]}>Pomona</Text>
        </View>

        <View style={{ flexDirection: 'column', position: 'absolute', left: 20, bottom: 100, right: 20 }}>
          <Button onPress={() => this.goToSignIn()} buttonText={'LOGIN'} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
          <Button onPress={() => this.goToRegister()} buttonText={'REGISTER'} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

})
