import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Platform, StyleSheet, TouchableOpacity, ActivityIndicator, SectionList, TouchableWithoutFeedback } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { signout } from '../../store/actions/authActions'
import { Button } from '../../components'
import { connect } from 'react-redux'
import { COLORS } from '../../utils/res'
import { Satellite, NavigationActions } from '../../utils'
import { ENDPOINT } from '../../utils/config'
import styled from './styled'

type Props = {
  dispatch: dispatch
}
@connect((store)=>{
  return {
  }
})

class Home extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      runned: false,
      isLoading: true,
      refreshing: true
    }
  }

  componentDidMount() {
    if (!this.state.runned) {
      this.getMyList()
    }
  }

  getMyList() {
    this.setState({ runned: true }, () => {
      Satellite.get(ENDPOINT.ALL_TODO)
        .then((response) => {
          this.setState({ isLoading: false, refreshing: false, data: response.data.data })
          console.log('getMyList', response)
        }).catch((err) => {
          const message = err.response.data.data.message
          console.log('ERROR', message)
          Alert.alert('Attention', message)
          this.setState({ isLoading: false, refreshing: false })
        })
    })

  }

  doRefresh() {
    this.setState({
      refreshing: true
    }, () => this.getMyList())
  }

  goToAddPage() {
    NavigationActions.goToStackDetails(this.props.navigation, 'AddNew', { })
  }

  goToDetail(item) {
    NavigationActions.goToStackDetails(this.props.navigation, 'Todo', { item: item })
  }

  render() {
    const { data, isLoading, refreshing } = this.state
    return (
      <View style={[ styled.container, { justifyContent: 'center', alignItems: 'center', paddingTop: 20 } ]}>
        { isLoading ? (
          <View style={{ alignSelf: 'center' }}>
            <ActivityIndicator size={'large'} color={COLORS.colorWhite} />
          </View>
        ) : (
          <SectionList
            ref='SectionList'
            style={{ width: '100%', heigth: '100%', paddingTop: 50, paddingHorizontal: 10 }}
            sections={[ { title: 'My Todo', data: data } ]}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <Text style={[ styled.title, { padding: 20, letterSpacing: 0 }]}>{title}</Text>
              )
            }}
            refreshing={refreshing}
            onRefresh={() => {
              this.doRefresh()
            }}
            renderItem={({ item, index, section }) => {
              return (
                <TouchableWithoutFeedback onPress={() => this.goToDetail(item)}>
                  <View style={styled.container_row}>
                    <Text style={styled.row_title}>{item.title}</Text>
                    <Text style={styled.row_note}>{item.note}</Text>
                    <View style={{ alignSelf: 'center', position: 'absolute', top: -20, right: 10, flexDirection: 'row' }}>
                      <Ionicons name='md-attach' size={35} color={'#d4d8d9'} style={{ margin: 8 }} />
                      <Ionicons name='md-attach' size={35} color={'#d4d8d9'} style={{ margin: 8 }}/>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
            onEndReached={(endValue) => {
              // FETCH LOAD MORE
              console.log('LOAD MORE')
            }}
            onEndReachedThreshold={0.5}
          />
        )}

        <Button style={{ flexDirection: 'column', position: 'absolute',  top: 40, right: 20 }} onPress={() => this.goToAddPage()} buttonText={'New Todo'} backgroundColor={'transparent'} buttonTextColor={COLORS.text} />
      </View>
    )
  }
}

export default Home
