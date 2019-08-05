import React, { Component } from 'react'
import { ScrollView, View, Animated, Platform, TouchableOpacity, StyleSheet, Text, TextInput, Keyboard, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
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
      name: '',
      email: '',
      password: '',
      isProcessing: false,
      showPass: true
    }
  }

  verify(name, email, password) {
    this.setState({ isProcessing: true })
    if (name === '') {
      Alert.alert('Please input the name')
      this.setState({ isProcessing: false })
    } else if (email === '') {
      Alert.alert('Please input the email')
      this.setState({ isProcessing: false })
    } else if (password === '') {
      Alert.alert('Please input the password')
      this.setState({ isProcessing: false })
    } else {
      this.doRegister(name, email, password)
    }
  }

  doRegister(name, email, password) {
    Satellite.post(ENDPOINT.REGISTER, {
      name: name,
      email: email,
      password: password
    }).then((response) => {
      if (response.data.data) {
        console.log('response', response)
        console.log('response.data.data', response.data.data)
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
    const { name, email, password, isProcessing, showPass } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Animated.View style={{ flex: 1, paddingTop: 20, flexDirection: 'column' }}>
            <BackButton onPress={() => this.goBack()}/>
            <Text style={[styled.title, { paddingTop: 30, paddingLeft: 30 }]}>Register</Text>
            <View style={{ padding: 30, flexDirection: 'column' }}>
              <Text style={[styled.subtitle, { }]}>Name</Text>
              <TextInput
                style={styled.input}
                autoCapitalize={'none'}
                keyboardType={'default'}
                onChangeText={(value) => this.setState({ name: value }, () => console.log(this.state.email))}
                value={this.state.name}
                placeholder={'Input Name here...'}
                placeholderTextColor={COLORS.textGray}
                underlineColorAndroid={'white'}
                multiline={false}
                numberOfLines={1}
                />
              <Text style={[styled.subtitle, { paddingTop: 10 }]}>Email Address</Text>
              <TextInput
                style={styled.input}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={(value) => this.setState({ email: value }, () => console.log(this.state.email))}
                value={this.state.email}
                placeholder={'Input email here...'}
                placeholderTextColor={COLORS.textGray}
                underlineColorAndroid={'white'}
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
                underlineColorAndroid={'white'}
                />
              <TouchableOpacity onPress={() => this.toggleVisibility()}>
                <Text style={[styled.subtitle, { paddingTop: 10, fontSize: 12, textAlign: 'right' }]}>{showPass ? 'Show Password' : 'Hide Password'}</Text>
              </TouchableOpacity>

            </View>
          </Animated.View>
        </KeyboardAvoidingView>
        </ScrollView>

        { isProcessing ? (
          <View style={{ flexDirection: 'column', position: 'absolute',  bottom: 30, right: 30 }}>
            <ActivityIndicator color={COLORS.colorWhite} size={'large'} />
          </View>
        ): (
          <Button style={{ flexDirection: 'column', position: 'absolute',  bottom: 20, right: 20 }} onPress={() => this.verify(name, email, password)} buttonText={'Proceed'} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
        )}
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
