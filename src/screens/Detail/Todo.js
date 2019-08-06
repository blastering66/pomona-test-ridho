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

class Todo extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      mytodo: {},
      id: 0,
      title: '',
      priority: 1,
      note: '',
      isProcessing: false,
      editable: true
    }
  }

  componentDidMount() {
    const mytodo = this.props.navigation.state.params.item
    console.log('params Todo', mytodo)
    this.setState({
      mytodo: mytodo,
      id: mytodo.id,
      title: mytodo.title,
      priority: mytodo.priority,
      note: mytodo.note
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
      this.doUpdate(this.state.mytodo)
    }
  }

  setPrio(value) {
    this.setState({ priority: value })
  }

  doUpdate(mytodo) {
    const params = {
      id: mytodo.id,
      title: mytodo.title,
      priority: mytodo.priority,
      note: mytodo.note
    }
    console.log('params', params)
    console.log('Satellite', ENDPOINT.UPDATE_TODO + '/id:' + mytodo.id , params)
    Satellite.put(ENDPOINT.UPDATE_TODO + '/id:' + mytodo.id , params)
    .then((response) => {
      console.log('response', response)
      console.log('response.data.data', response.data.data)
      this.setState({ isProcessing: false }, () => this.props.navigation.goBack(null))
    }).catch((err) => {
      // const message = err.response.data.data.message
      console.log('ERROR', err.response)
      console.log('ERROR', err.response.data)
      console.log('ERROR', err.response.data.data)
      Alert.alert('Attention', err.response.data.data.message)
      this.setState({ isProcessing: false })
    })
  }

  doDelete() {
    Satellite.delete(ENDPOINT.UPDATE_TODO + '/id:' + this.state.mytodo.id)
    .then((response) => {
      console.log('response', response)
      console.log('response.data.data', response.data.data)
      this.setState({ isProcessing: false }, () => this.props.navigation.goBack(null))
    }).catch((err) => {
      console.log('ERROR', err.response)
      console.log('ERROR', err.response.data)
      console.log('ERROR', err.response.data.data)
      Alert.alert('Attention', err.response.data.data.message)
      this.setState({ isProcessing: false })
    })
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  toggleEdit() {
    this.setState({
      editable: !this.state.editable
    }, () => {
      this.startEdit.focus()
    })
  }

  render() {
    const { title, priority, note, isProcessing, editable } = this.state
    return (
      <View style={[ styled.container, { } ]}>
        <View style={{ flex: 1, paddingTop: 50, flexDirection: 'column' }}>
          <BackButton onPress={() => this.goBack()}/>
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
              underlineColorAndroid={'white'}
              multiline={false}
              numberOfLines={1}
              editable={editable}
              autoFocus={true}
              ref={(input) => { this.startEdit = input; }}
              />

            <Text style={[styled.subtitle, { paddingTop: 20 }]}>Priority</Text>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
              <Button style={{ flex: 1 }} onPress={() => this.setPrio(1)} buttonText={'Low'} backgroundColor={'transparent'} buttonTextColor={COLORS.colorBlack} />
              <Button style={{ flex: 1, paddingHorizontal: 10 }} onPress={() => this.setPrio(2)} buttonText={'Medium'} backgroundColor={'transparent'} buttonTextColor={COLORS.colorBlack} />
              <Button style={{ flex: 1 }} onPress={() => this.setPrio(3)} buttonText={'Hight'} backgroundColor={'transparent'} buttonTextColor={COLORS.colorBlack} />
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
              underlineColorAndroid={'white'}
              multiline={false}
              numberOfLines={2}
              editable={editable}
              />


          </View>

          { isProcessing ? (
            <View style={{ flexDirection: 'column', position: 'absolute',  bottom: 30, right: 30 }}>
              <ActivityIndicator color={COLORS.colorWhite} size={'large'} />
            </View>
          ): (
            <Button style={{ flexDirection: 'column', position: 'absolute',  bottom: 20, right: 20 }} onPress={() => this.verify(title, note)} buttonText={'  Update  '} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
          )}

          <Button style={{ flexDirection: 'column', position: 'absolute',  top: 50, right: 20 }} onPress={() => this.doDelete()} buttonText={'  Delete  '} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
        </View>
      </View>
    )
  }
}

export default Todo
