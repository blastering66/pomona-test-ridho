import axios from 'axios'
import NavigationActions from './NavigationActions'
import Application from './Application'
import { BASE_URL } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    Accept: 'en'
  }
})

instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

export default instance
