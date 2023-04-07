import React, {useEffect, useState, useRef} from 'react'
import {Grid, Box, Card, Typography} from '@mui/material'
import {Link, useHistory, useLocation, withRouter} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import SimpleReactValidator from 'simple-react-validator'
import {ActionCreators} from '../../redux/actions'
import {CustomButton, CustomTextBox, Snackbar, AuthRightPanel, Loader} from '../../components'
import Welcome from '../../images/logo.png'
import * as routesNames from '../../constants/routes'
import MyDiv from './verifyOTP.style'
const VerifyOTP = React.memo((props) => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')
  const router = useHistory()
  const location = useLocation()
  const authState = useSelector((state) => state.authState)
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [values, setValues] = React.useState({
    otp: '',
    email: location?.state?.email,
    type: location?.state?.type,
  })
  const onChangeInput = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }

  useEffect(() => {
    if (authState?.forgotSendOTP?.data?.payload) {
      setMessage(authState.forgotSendOTP.data.meta?.message)
      setStatus('success')
    } else if (authState?.forgotSendOTP?.error?.meta) {
      setMessage(authState.forgotSendOTP.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.forgotSendOTP])

  useEffect(() => {
    if (authState?.forgotVerifyOTP?.data?.payload) {
      setMessage(authState.forgotVerifyOTP.data.meta?.message)
      setStatus('success')
      router.push(routesNames.FORGOT_CHANGE_PASSWORD, {type: values.type})
    } else if (authState?.forgotVerifyOTP?.error?.meta) {
      setMessage(authState.forgotVerifyOTP.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.forgotVerifyOTP])

  useEffect(() => {
    if (authState?.registerVerifyOTP?.data?.payload) {
      setMessage(authState.registerVerifyOTP.data.meta?.message)
      setStatus('success')
      router.push(routesNames.DASHBOARD)
    } else if (authState?.registerVerifyOTP?.error?.meta) {
      setMessage(authState.registerVerifyOTP.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.registerVerifyOTP])

  useEffect(() => {
    return () => {
      props.actions.cleanUpState()
    }
  }, [])
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  const verifyOTPAction = (e) => {
    e.preventDefault()
    let isValid = simpleValidator.current.allValid()

    if (!isValid) {
      simpleValidator.current.showMessages(true)
      forceUpdate(1)
    }
    if (simpleValidator.current.allValid() && values.type === 'forgot-password') {
      props.actions.forgotVerifyOTPAction(values?.otp, values?.type)
    } else if (simpleValidator.current.allValid() && values.type === 'register') {
      props.actions.registerVerifyOTPAction(values?.otp, values?.type)
    }
  }

  const resendOtpAction = (e) => {
    e.preventDefault()
    if (values.type === 'forgot-password') {
      props.actions.forgotSendOTPAction(values)
    } else if (values.type === 'register') {
      props.actions.registerResendOTPAction(values)
    }
  }

  return (
    <MyDiv>
      {authState?.forgotVerifyOTP?.loading &&
      <div>
        <Loader />
      </div>
      }
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      <Box>
        <Grid container className="auth-container">
          <Grid item md={4} xs={12} sm={5}>
            <Box className="left-side">
              <div className="sign_in">
                <div className="welcome_img">
                  <img src={Welcome} alt="pic" />
                </div>
                <Card className="custom-card">
                  <div className="custom-card-body">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color="#000"
                      fontWeight="600"
                      className="signin_heading"
                      textAlign="center"
                    >
                      Verify OTP
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#333"
                      className="signin_subheading"
                      textAlign="center"
                    >
                      <Link to={routesNames.LOGIN} style={{textDecoration: 'none', color: '#1976d2'}}>
                        Back to login
                      </Link>
                    </Typography>
                    <Grid>
                      <form noValidate autoComplete="off">
                        <Box mt={2}>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            OTP
                          </Typography>
                          <CustomTextBox
                            type="number"
                            name="otp"
                            value={values.otp}
                            //fieldlabel="OTP"
                            onChange={onChangeInput('otp')}
                            onBlur={() => simpleValidator.current.showMessageFor('otp')}
                            error={authState?.forgotVerifyOTP?.error?.errors?.otp || simpleValidator.current.message('otp', values.otp, 'required|number')}
                            helperText={authState?.forgotVerifyOTP?.error?.errors?.otp || simpleValidator.current.message('otp', values.otp, 'required|number')}
                          />
                          <CustomButton fieldlabel="Resend OTP" onClick={resendOtpAction} variant="text" className="text-font resend_otp" />
                        </Box>
                        <Box>
                          <CustomButton type="submit" fieldlabel="Submit" variant="contained" onClick={verifyOTPAction} className="text-font action_button" />
                        </Box>
                      </form>
                    </Grid>
                  </div>
                </Card>
              </div>
            </Box>
          </Grid>
          <Grid item md={4} xs={12} sm={5} display={{xs: 'none', lg: 'block', sm: 'block'}}>
            <AuthRightPanel />
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(VerifyOTP)
