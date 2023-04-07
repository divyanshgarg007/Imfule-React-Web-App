import React, {useEffect, useState} from 'react'
import qs from 'qs'
import {connect, useSelector} from 'react-redux'
import {useHistory, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
// import Alert from '@mui/material/Alert'
import {Redirecting} from '../../components'
import {ActionCreators} from '../../redux/actions'
import * as routesNames from '../../constants/routes'
import {getToken} from '../../utilities/authUtils'
import MyDiv from './shopifyResponse.style'
export const ShopifyResponse = (props) => {
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const [message, setMessage] = useState('Verifying...')
  const [status, setStatus] = useState('info')
  const router = useHistory()
  const history = useHistory()
  useEffect(() => {
    let queryString = qs.parse(props.location?.search, {ignoreQueryPrefix: true})
    const {code, hmac, host, shop, timestamp} = queryString
    const token = getToken('token')
    if (code && hmac && host && shop && timestamp) {
      if (token) {
        props.actions.addStoreResponseAction(code, hmac, host, shop, timestamp)
      } else {
        props.actions.signInShopifyResponseAction(code, hmac, host, shop, timestamp, 'shopify')
      }
    } else {
      setMessage('Something went wrong')
      setStatus('error')
      history.push(routesNames.LOGIN)
    }
  }, [])
  useEffect(() => {
    if (authState?.shopifyResponse?.data?.payload) {
      setMessage(authState.shopifyResponse.data.meta?.message)
      setStatus('success')
      props.actions.importScriptAction('shopify', authState?.shopifyResponse?.data?.payload?.shop_id)
      router.push(routesNames.STORE)
    } else if (authState?.shopifyResponse?.error?.meta) {
      setMessage(authState.shopifyResponse.error.meta?.message)
      router.push(routesNames.LOGIN)
      setStatus('error')
    }
  }, [authState?.shopifyResponse])

  useEffect(() => {
    if (userState?.addStoreResponse?.data?.payload) {
      setMessage(userState?.addStoreResponse.data.meta?.message)
      setStatus('success')
      props.actions.importScriptAction('shopify', userState?.addStoreResponse?.data?.payload?.id)
      router.push(routesNames.STORE)
    } else if (userState?.addStoreResponse?.error?.meta) {
      setMessage(userState?.addStoreResponse.error.meta?.message)
      router.push(routesNames.STORE)
      setStatus('error')
    }
  }, [userState?.addStoreResponse])
  return (
    <MyDiv>
      {/* <Alert severity={status}>
        {message}
      </Alert> */}
      <Redirecting message={message} status={status} />
    </MyDiv>

  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})
export default
React.memo(compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(ShopifyResponse))
