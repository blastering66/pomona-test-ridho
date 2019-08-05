// import Satellite from 'utils/Satellite'
import { LocalStorage, NavigationActions, Application, Satellite } from '../../utils'
import { reducer } from '../../store'

export default function authMiddleware({ getState, dispatch }) {
  return next => action => {
    const returnValue = next(action)
    const state = getState()

    // if (state.authData && state.authData.oauth && state.authData.oauth.access_token) {
    //   Satellite.defaults.headers.common['Authorization'] = `Bearer ${state.authData.oauth.access_token}`
    // } else {
    //   Satellite.defaults.headers.common['Authorization'] = null
    // }


    Satellite.defaults.headers.common['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJSaWRobyAwMSIsImVtYWlsIjoicmlkaG8wMUBnbWFpbC5jb20iLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTA1VDA2OjI4OjUyLjUxNloiLCJpYXQiOjE1NjQ5ODY1MzJ9.tM_JydaA7H586rQeEYwcc2oriZhIiZj3GzEf_wxkdoU`

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

    // if (action.type === '@APP/PROFILE_SAVE') {
    //   dispatch(NavigationActions.goToReset('SignedIn'))
    // }

    if (action.type === '@APP/AUTH_SIGN_OUT') {
      Application.emit('LoggedOut')
    }

    return returnValue
  }
}
