import React, {useEffect, useState, createRef, useRef} from 'react'
import {Grid, Box, Card, Typography} from '@mui/material'
import {Link, useHistory, withRouter} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
// import {CircularProgress} from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha'
import SimpleReactValidator from 'simple-react-validator'
import {ActionCreators} from '../../redux/actions'
import {CustomButton, CustomTextBox, Snackbar, AuthRightPanel, Loader} from '../../components'
import Welcome from '../../images/logo.png'
import * as routesNames from '../../constants/routes'
import MyDiv from './forgotPassword.style'
const ForgotPassword = React.memo((props) => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')
  const router = useHistory()
  const authState = useSelector((state) => state.authState)
  const siteKey = process?.env?.REACT_APP_SITE_KEY
  const recaptchaRef = createRef()
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [values, setValues] = React.useState({
    email: '',
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
      router.push(routesNames.VERIFY_OTP, {type: 'forgot-password', email: values.email})
    } else if (authState?.forgotSendOTP?.error?.meta) {
      setMessage(authState.forgotSendOTP.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.forgotSendOTP])

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
  const onClickVerifyOtpButton = (e) => {
    e.preventDefault()
    let isValid = simpleValidator.current.allValid()

    if (!isValid) {
      simpleValidator.current.showMessages(true)
      forceUpdate(1)
    }
    if (simpleValidator.current.allValid()) {
      recaptchaRef.current.reset()
      recaptchaRef.current.execute()
    }
  }
  const onChange = () => {
    props.actions.forgotSendOTPAction(values)
  }
  const onExpired = () => {
    recaptchaRef.current.reset()
    recaptchaRef.current.execute()
  }
  return (
    <MyDiv>
      {authState?.forgotSendOTP?.loading &&
      <div>
        {/* <CircularProgress style={{height: '40px', width: '40px', zIndex: 1000, position: 'absolute', top: '50%', left: '50%'}} /> */}
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
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={siteKey}
        onChange={onChange}
        onExpired={onExpired}
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
                      Forgot password
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
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Email
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="email"
                            value={values.email}
                            //fieldlabel="Email"
                            onChange={onChangeInput('email')}
                            onBlur={() => simpleValidator.current.showMessageFor('email')}
                            error={authState?.forgotSendOTP?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                            helperText={authState?.forgotSendOTP?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                          />
                        </Box>
                        <Box>
                          <CustomButton type="submit" fieldlabel="Send OTP" onClick={onClickVerifyOtpButton} variant="contained" className="text-font action_button" />
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
)(ForgotPassword)
