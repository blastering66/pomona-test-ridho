import React, { Component } from 'react'
import { View, Platform, AppState, Linking } from 'react-native'
import { LocalStorage, Application, NavigationActions, Satellite } from '../utils'
import _ from 'lodash'
const ios = Platform.OS === 'ios'
let _dispatch = null
type Props = {
  persistor: Object,
  loading: Function
}
export default class PersistGate extends Component<Props> {
  constructor(props) {
    super(props)
    const { dispatch } = LocalStorage.store
    _dispatch = dispatch
  }

  static defaultProps = {
    persistor: undefined,
  }

  state = {
    rehydrated: false,
    connectionInitiated: false,
    isLoggedIn: false,
    appState: AppState.currentState
  }

  componentDidMount() {
    const { persistor, navigation } = this.props
    const initState = JSON.stringify(LocalStorage.store.getState())

    LocalStorage._retrieveData('redux').then(data => {
      const newState = _.merge(JSON.parse(initState), JSON.parse(data))
      _dispatch({ type: '@LOCALSTORAGE/REHYDRATE', data: newState })
    }).catch(error => {
      console.log('error', error)
    })
    LocalStorage.on('Rehydrated', ({ isLoggedIn }) => {
      this.setState({ rehydrated: true, isLoggedIn }, () => {
        console.log('rehydrated isLoggedIn', isLoggedIn)
        if (isLoggedIn) {
          _dispatch(NavigationActions.goToReset('Home'))
        } else {
          _dispatch(NavigationActions.goToReset('Welcome'))
        }
      })
    })


    Application.on('LoggedIn', () => {
      _dispatch(NavigationActions.goToReset('Home'))
      this.setState({ isLoggedIn: true })
      this.forceUpdate()
    })
    Application.on('LoggedOut', () => {
      this.setState({ isLoggedIn: false })
      _dispatch(NavigationActions.goToReset('Welcome'))
    })

  }

  componentWillUnmount() {
    try {
      Application.removeAllListeners()
    } catch (err) {
      console.log('Error unmount')
    }
  }

  render() {
    const { children, loading } = this.props
    const { rehydrated, isLoggedIn, connectionInitiated } = this.state

    let renderLoading = loading
    if (typeof renderLoading === 'function') {
      renderLoading = renderLoading()
    }

    return (
      <View style={{ flex: 1 }}>
        {rehydrated ? children : renderLoading}
      </View>
    )
  }
}
