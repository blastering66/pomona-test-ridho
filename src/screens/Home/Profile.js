import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native'
import { signout } from '../../store/actions/authActions'
import { connect } from 'react-redux'

type Props = {
  dispatch: dispatch
}

@connect((store)=>{
  return {
  }
})
class Profile extends Component<Props> {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
       <TouchableOpacity onPress={() => this.props.dispatch(signout())}>
          <View style={{ padding: 100  }}>
            <Text>Logout</Text>
          </View>
       </TouchableOpacity>
      </View>
    )
  }
}

export default Profile
