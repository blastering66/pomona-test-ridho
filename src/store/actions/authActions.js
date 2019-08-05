function authenticatedAction (data) {
  return {
    type: '@APP/AUTH_AUTHENTICATION',
    data: data
  }
}

function saveProfileAction (data) {
  return {
    type: '@APP/PROFILE_SAVE',
    data: data
  }
}

export function authenticated (data, callback) {
  return (dispatch, getState) => {
    dispatch(authenticatedAction(data))
    if (typeof (callback) === 'function') {
      setTimeout(() => {
        callback()
      }, 10)
    }
    return getState().authData
  }
}

function signoutAction () {
  return {
    type: '@APP/AUTH_SIGN_OUT',
    data: {
      token: {},
      user: {}
    }
  }
}

export function savingProfile (data, callback) {
  return (dispatch, getState) => {
    dispatch(saveProfileAction(data))
    if (typeof (callback) === 'function') {
      setTimeout(() => {
        callback()
      }, 10)
    }
    return getState().authData
  }
}

export function signout (callback) {
  return (dispatch, getState) => {
    const state = getState()
    if (state.authData.token !== null) {
      dispatch(signoutAction())
      if (typeof (callback) === 'function') {
        setTimeout(() => {
          callback()
        }, 10)
      }
    }
    return getState().authData
  }
}
