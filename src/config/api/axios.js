import axios from 'axios'
import {getToken} from '../../utilities/authUtils'
import {logoutValidUser} from '../../redux/actions/authActions'
import Store from '../../redux/store'
const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  crossDomain: false,
})

apiInstance.interceptors.request.use((config) => {
  const token = getToken('token')
  const companyID = getToken('companyID')
  config.headers.Authorization = token && token !== 'undefined' ? `Bearer ${token}` : ''
  config.headers['company-id'] = companyID && companyID !== 'undefined' ? companyID : ''
  if (getToken('selectedStore') && getToken('selectedStore') !== 'undefined') {config.headers['shop-id'] = getToken('selectedStore')}
  return config
})

// Add a response interceptor
apiInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    const {dispatch} = Store
    if (dispatch) {
      dispatch(logoutValidUser('invalidUser'))
    }
    return
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default apiInstance
