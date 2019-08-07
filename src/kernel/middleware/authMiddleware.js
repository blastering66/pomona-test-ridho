// import Satellite from 'utils/Satellite'
import { LocalStorage, NavigationActions, Application, Satellite } from '../../utils'
import { reducer } from '../../store'

export default function authMiddleware({ getState, dispatch }) {
  return next => action => {
    const returnValue = next(action)
    const state = getState()

    if (state.token !== '') {
      Satellite.defaults.headers.common['Authorization'] = `${state.authData.token}`
    } else {
      Satellite.defaults.headers.common['Authorization'] = null
    }

    if (action.type === '@LOCALSTORAGE/REHYDRATE') {
      const data = action.data
      if (data.authData.token !== '') {
        dispatch(NavigationActions.goToReset('Home'))
        dispatch({ type: '@APP/AUTH_AUTHENTICATED' })
        Application.emit('LoggedIn')
      }
      LocalStorage.emit('Rehydrated', { isLoggedIn: data.authData.token !== '' ? true : false })
    }

    if (action.type === '@APP/AUTH_AUTHENTICATION') {
      Application.emit('LoggedIn')
      dispatch({ type: '@APP/AUTH_AUTHENTICATED' })
    }

    if (action.type === '@APP/AUTH_SIGN_OUT') {
      Application.emit('LoggedOut')
    }

    return returnValue
  }
}
