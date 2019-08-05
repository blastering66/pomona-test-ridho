import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { navMiddleware } from './router'
import authMiddleware from './middleware/authMiddleware'
import persistMiddleware from './middleware/persistMiddleware'
import { LocalStorage, Application } from '../utils'

import reducers from '../store'

const persistedReducer = LocalStorage.persistReducer({}, reducers)
const store = createStore(persistedReducer, applyMiddleware(thunk, logger, navMiddleware, persistMiddleware, authMiddleware))
const persistor = LocalStorage.persistStore(store)
Application.registerStore(store)

export default {
  store, persistor
}
