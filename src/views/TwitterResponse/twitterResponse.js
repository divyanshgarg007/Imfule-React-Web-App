/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import qs from 'qs'
// import Alert from '@mui/material/Alert'
import * as routesNames from '../../constants/routes'
import {ActionCreators} from '../../redux/actions'
import {Redirecting} from '../../components'
import {getToken} from '../../utilities/authUtils'
import MyDiv from './twitterResponse.style'
const TwitterResponse = (props) => {
  const userState = useSelector((state) => state.userState)
  const [message, setMessage] = useState('We are redirecting to the page. Please Wait.....')
  const [status, setStatus] = useState('info')
  const router = useHistory()
  const history = useHistory()
  useEffect(() => {
    let queryString = qs.parse(props.location?.search, {ignoreQueryPrefix: true})
    const {oauth_token, oauth_verifier} = queryString
    if (oauth_token && oauth_verifier && getToken('request_token_secret')) {
      let obj = {
        oauth_token: oauth_token,
        oauth_verifier: oauth_verifier,
        oauth_token_secret: getToken('request_token_secret'),
      }
      props.actions.addSocialMediaResponseAction(obj, 'twitter')
    } else {
      setMessage('Something went wrong')
      setStatus('error')
      history.push(routesNames.PROFILE)
    }
  }, [])

  useEffect(() => {
    if (userState?.addSocialMediaResponse?.data?.payload) {
      setMessage(userState?.addSocialMediaResponse.data.meta?.message)
      setStatus('success')
      router.push(routesNames.PROFILE)
    } else if (userState?.addSocialMediaResponse?.error?.meta) {
      setMessage(userState?.addSocialMediaResponse.error.meta?.message)
      router.push(routesNames.PROFILE)
      setStatus('error')
    }
  }, [userState?.addSocialMediaResponse])
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

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(TwitterResponse)
