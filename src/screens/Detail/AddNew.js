import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform, StyleSheet, Keyboard, Alert, TouchableOpacity, ActivityIndicator, SectionList, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button, BackButton } from '../../components'
import { connect } from 'react-redux'
import { COLORS } from '../../utils/res'
import { Satellite } from '../../utils'
import { ENDPOINT } from '../../utils/config'
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
      title: '',
      priority: 1,
      note: '',
      isProcessing: false,
      refreshFunction: null,
      refreshType: ''
    }
  }

  componentDidMount() {
    this.setState({
      refreshType: this.props.navigation.state.params.refreshType,
      refreshFunction: this.props.navigation.state.params.refreshFunction
    })
  }

  verify(title, note) {
    this.setState({ isProcessing: true })
    if (title === '') {
      Alert.alert('Please input the Title')
      this.setState({ isProcessing: false })
    } else if (note === '') {
      Alert.alert('Please input the Note')
      this.setState({ isProcessing: false })
    } else {
      this.postTodo(title, this.state.priority, note)
    }
  }

  setPrio(value) {
    this.setState({ priority: value })
  }

  postTodo(title, prio, note ) {
    const self = this
    const params = {
      title: title,
      priority: prio,
      note: note
    }
    Satellite.post(ENDPOINT.CREATE_TODO, params)
    .then((response) => {
      const refreshFunc = self.state.refreshFunction
      const refreshType = self.state.refreshType
      if (refreshType === 'refreshNow') {
        refreshFunc()
      }
      self.props.navigation.goBack(null)
    }).catch((err) => {
      const message = err.response.data.data.message
      Alert.alert('Attention', message)
      this.setState({ isProcessing: false })
    })
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  render() {
    const { title, priority, note, isProcessing } = this.state
    return (
      <View style={[ styled.container, { } ]}>
        <View style={{ flex: 1, paddingTop: 50, flexDirection: 'column' }}>
          <BackButton onPress={() => this.goBack()}/>
          <Text style={[styled.subtitle, { paddingLeft: 30, paddingTop: 10 }]}>Create new</Text>
          <View style={{ padding: 30, flexDirection: 'column' }}>
            <Text style={[styled.subtitle, { }]}>Title</Text>
            <TextInput
              style={styled.input}
              autoCapitalize={'none'}
              keyboardType={'default'}
              onChangeText={(value) => this.setState({ title: value })}
              value={this.state.title}
              placeholder={'Input title here...'}
              placeholderTextColor={COLORS.textGray}
              underlineColorAndroid={'transparent'}
              multiline={false}
              numberOfLines={1}
              />

            <Text style={[styled.subtitle, { paddingTop: 20 }]}>Priority</Text>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
              <TouchableOpacity onPress={() => this.setPrio(1)} style={{ flex: 1 }}>
                <View style={{ borderRadius: 25, borderWidth: 1, borderColor: priority == 1 ? 'transparent' : 'white', backgroundColor: priority == 1 ? 'white' : 'transparent' }}>
                  <Text style={{ color: priority == 1 ? COLORS.colorAppTheme : 'white', fontSize: 16, padding: 10, textAlign: 'center' }}>Low</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setPrio(2)} style={{ flex: 1, marginHorizontal: 10 }}>
                <View style={{ borderRadius: 25, borderWidth: 1, borderColor: priority == 2 ? 'transparent' : 'white', backgroundColor: priority == 2 ? 'white' : 'transparent' }}>
                  <Text style={{ color: priority == 2 ? COLORS.colorAppTheme : 'white', fontSize: 16, padding: 10, textAlign: 'center' }}>Medium</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setPrio(3)} style={{ flex: 1 }}>
                <View style={{ borderRadius: 25, borderWidth: 1, borderColor: priority == 3 ? 'transparent' : 'white', backgroundColor: priority == 3 ? 'white' : 'transparent' }}>
                  <Text style={{ color: priority == 3 ? COLORS.colorAppTheme : 'white', fontSize: 16, padding: 10, textAlign: 'center' }}>High</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={[styled.subtitle, { paddingTop: 50 }]}>Note</Text>
            <TextInput
              style={styled.input}
              autoCapitalize={'none'}
              keyboardType={'default'}
              onChangeText={(value) => this.setState({ note: value })}
              value={this.state.note}
              placeholder={'Input note here...'}
              placeholderTextColor={COLORS.textGray}
              underlineColorAndroid={'transparent'}
              multiline={true}
              numberOfLines={3}
              />


          </View>

          { isProcessing ? (
            <View style={{ flexDirection: 'column', position: 'absolute',  bottom: 30, right: 30 }}>
              <ActivityIndicator color={COLORS.colorWhite} size={'large'} />
            </View>
          ): (
            <Button style={{ flexDirection: 'column', position: 'absolute',  bottom: 20, right: 20 }} onPress={() => this.verify(title, note)} buttonText={'  Create  '} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
          )}
        </View>
      </View>
    )
  }
}

export default AddNew
