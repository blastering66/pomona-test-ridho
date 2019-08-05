import React, { Component } from 'react'
import { View, Platform, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Satellite, NavigationActions } from '../../utils'
import { ENDPOINT } from '../../utils/config'
import { authenticated } from '../../store/actions/authActions'

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

  componentDidMount() {
    console.log('USER', this.props.user)
  }

  verifyLogin(email, password) {
    // Satellite.defaults.headers.common['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJSaWRobyAwMSIsImVtYWlsIjoicmlkaG8wMUBnbWFpbC5jb20iLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJpYXQiOjE1NjQ5ODY1MzJ9.tM_JydaA7H586rQeEYwcc2oriZhIiZj3GzEf_wxkdoU`
    this.doLogin('ridho02@gmail.com', 'Password123')
  }

  doLogin(email, password) {
    Satellite.post(ENDPOINT.LOGIN, {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.data) {
        console.log('response', response)
        console.log('response.data.data', response.data.data)
        this.props.dispatch(authenticated(response.data.data, () => NavigationActions.goToReset('Home')))
      }
    }).catch((err) => {
      console.log('ERROR', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
          <View style={{ alignSelf: 'center', flexDirection: 'row', padding: 10 }}>
            <Text>Username</Text>
            <Text></Text>
          </View>

          <View style={{ alignSelf: 'center', flexDirection: 'row', padding: 10 }}>
            <Text>Username</Text>
            <Text>Email</Text>
          </View>

          <TouchableOpacity onPress={() => {
            // this.verifyLogin('asd', 'asd')
            this.props.navigation.navigate('SignIn')
          }}>
            <View style={{ backgroundColor: '#ddd', padding: 20, alignItems: 'center' }}>
              <Text>GO TO LOGIN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            // this.verifyLogin('asd', 'asd')
            this.props.navigation.navigate('Home')
          }}>
            <View style={{ backgroundColor: '#ddd', padding: 20, alignItems: 'center' }}>
              <Text>GO TO HOME</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            this.verifyLogin('asd', 'asd')
            // this.props.navigation.navigate('Service')
          }}>
            <View style={{ backgroundColor: '#ddd', padding: 20, alignItems: 'center' }}>
              <Text>Login</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
})
