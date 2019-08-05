// import update from 'immutability-helper'

const initial = () => {
  return {
    token: '',
    user: {},
  }
}

function data(state = initial(), action) {
  switch (action.type) {
    case '@APP/AUTH_AUTHENTICATION':
      state.token = action.data.token
      return state
    case '@APP/PROFILE_SAVE':
      const storeData = {
        id: action.data.data.id,
        name: action.data.data.name,
        email: action.data.data.email
      }
      state.user = storeData
      return state
    case '@APP/AUTH_SIGN_OUT':
      state.token = '',
      state.user = {}
      return state
  }
  return state
}

export default data
