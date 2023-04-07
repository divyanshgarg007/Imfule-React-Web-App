import React, {useEffect, useState} from 'react'
import qs from 'qs'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
// import Alert from '@mui/material/Alert'
import {Redirecting} from '../../components'
import {ActionCreators} from '../../redux/actions'
import MyDiv from './shopifyInstall.style'
export const ShopifyInstall = (props) => {
  const userState = useSelector((state) => state.userState)
  const [message, setMessage] = useState('Verifying...')
  const [status, setStatus] = useState('info')

  useEffect(() => {
    let queryString = qs.parse(props.location?.search, {ignoreQueryPrefix: true})
    const {hmac, host, shop, timestamp} = queryString
    if (hmac && host && shop && timestamp) {
      props.actions.addStoreInstallAction(hmac, host, shop, timestamp, 'shopify')
    } else {
      setMessage('Something went wrong')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    if (userState?.addStoreInstall?.data?.payload?.url) {
      setMessage(userState?.addStoreInstall.data.meta?.message)
      setStatus('success')
      window.location.href = userState.addStoreInstall.data.payload.url
    } else if (userState?.addStoreInstall?.error?.meta) {
      setMessage(userState?.addStoreInstall.error.meta?.message)
      setStatus('error')
    }
  }, [userState?.addStoreInstall])
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
)(ShopifyInstall))
