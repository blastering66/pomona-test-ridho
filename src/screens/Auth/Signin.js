import React, { Component } from 'react'
import { View, Platform, TouchableOpacity, StyleSheet, Text, TextInput, Keyboard, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Satellite, NavigationActions } from '../../utils'
import { COLORS } from '../../utils/res'
import { Button, BackButton } from '../../components'
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

export default class SignIn extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isProcessing: false,
      showPass: true
    }
  }

  componentDidMount() {
  }

  verify(email, password) {
    // Satellite.defaults.headers.common['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJSaWRobyAwMSIsImVtYWlsIjoicmlkaG8wMUBnbWFpbC5jb20iLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJpYXQiOjE1NjQ5ODY1MzJ9.tM_JydaA7H586rQeEYwcc2oriZhIiZj3GzEf_wxkdoU`
    // this.doLogin('ridho02@gmail.com', 'Password123')
    this.setState({ isProcessing: true })
    if (email === '') {
      Alert.alert('Please input the email')
      this.setState({ isProcessing: false })
    } else if (password === '') {
      Alert.alert('Please input the password')
      this.setState({ isProcessing: false })
    } else {
      this.doLogin(email, password)
    }
  }

  doLogin(email, password) {
    Satellite.post(ENDPOINT.LOGIN, {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.data) {
        console.log('response', response)
        console.log('response.data.data', response.data.data)
        this.setState({ isProcessing: false })
        this.props.dispatch(authenticated(response.data.data, () => NavigationActions.goToReset('Home')))
      }
    }).catch((err) => {
      const message = err.response.data.data.message
      console.log('ERROR', message)
      Alert.alert('Attention', message)
      this.setState({ isProcessing: false })
    })
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  toggleVisibility() {
    this.setState({ showPass: !this.state.showPass })
  }

  render() {
    const { email, password, isProcessing, showPass } = this.state
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, paddingTop: 50, flexDirection: 'column' }}>
          <BackButton onPress={() => this.goBack()}/>
          <Text style={[styled.subtitle, { padding: 30 }]}>Log In</Text>
          <View style={{ padding: 30, flexDirection: 'column' }}>
            <Text style={[styled.subtitle, { }]}>Email Address</Text>
            <TextInput
              style={styled.input}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              onChangeText={(value) => this.setState({ email: value })}
              value={this.state.email}
              placeholder={'Input email here...'}
              placeholderTextColor={COLORS.textGray}
              underlineColorAndroid={'transparent'}
              multiline={false}
              numberOfLines={1}
              />
            <Text style={[styled.subtitle, { paddingTop: 10 }]}>Password</Text>
            <TextInput
              style={styled.input}
              keyboardType={'default'}
              onChangeText={(value) => this.setState({ password: value })}
              value={this.state.password}
              placeholder={'Input password here...'}
              placeholderTextColor={COLORS.textGray}
              secureTextEntry={showPass}
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={'transparent'}
              />
            <TouchableOpacity onPress={() => this.toggleVisibility()}>
              <Text style={[styled.subtitle, { paddingTop: 10, fontSize: 12, textAlign: 'right' }]}>{showPass ? 'Show Password' : 'Hide Password'}</Text>
            </TouchableOpacity>
          </View>

          { isProcessing ? (
            <View style={{ flexDirection: 'column', position: 'absolute',  bottom: 30, right: 30 }}>
              <ActivityIndicator color={COLORS.colorWhite} size={'large'} />
            </View>
          ): (
            <Button style={{ flexDirection: 'column', position: 'absolute',  bottom: 20, right: 20 }} onPress={() => this.verify(email, password)} buttonText={'Proceed'} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
          )}
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bbabb'
  }

})
