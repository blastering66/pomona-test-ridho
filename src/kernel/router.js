import routes from '../routes'
import React from 'react'
import { connect } from 'react-redux'
import { BackHandler, View, Linking } from 'react-native'
import { Application } from '../utils'
import { createStackNavigator, NavigationActions, createAppContainer } from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'

let _dispatch = null
const AppNavigator = routes

export const navData = createNavigationReducer(AppNavigator)
export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navData
)

const Layout = () => {
  const App = reduxifyNavigator(AppNavigator, 'root')
  const mapStateToProps = (state) => ({
    state: state.navData
  })
  const Layout = connect(mapStateToProps)(App)

  type Props = {}
  class AppLayout extends React.Component<Props> {
    constructor(props) {
      super(props)
    }
    state = {
      backPressedOnce: false
    }

    componentDidMount() {
      const { dispatch } = this.props
      _dispatch = dispatch
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }

    onBackPress = () => {
      const { dispatch, nav } = this.props
      if (nav.index === 0) {
        if (!this.state.backPressedOnce) {
          // this.refs.toast.show('Backpress one more to quit...')
          this.setState({ backPressedOnce: true })
          return true
        } else {
          dispatch(NavigationActions.back())
          return false
        }
      }

      dispatch(NavigationActions.back())
      return true
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <Layout/>
        </View>
      )
    }
  }
  return connect((state) => ({
    nav: state.navData
  }))(AppLayout)
}

export default {
  Layout
}
