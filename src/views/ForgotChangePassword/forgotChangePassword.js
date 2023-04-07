/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react'
import {Grid, Box, Card, Typography} from '@mui/material'
import {Link, useHistory, withRouter, useLocation} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import SimpleReactValidator from 'simple-react-validator'
import {ActionCreators} from '../../redux/actions'
import {CustomButton, CustomTextBox, Snackbar, AuthRightPanel, Loader} from '../../components'
import Welcome from '../../images/logo.png'
import * as routesNames from '../../constants/routes'
import MyDiv from './forgotChangePassword.style'
const ForgotChangePassword = React.memo((props) => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')
  const router = useHistory()
  const authState = useSelector((state) => state.authState)
  const location = useLocation()
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [values, setValues] = React.useState({
    password: '',
    password_confirmation: '',
    type: location?.state?.type,
  })
  const onChangeInput = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }
  useEffect(() => {
    if (authState?.forgotChangePassword?.data?.payload) {
      setMessage(authState.forgotChangePassword.data.meta?.message)
      setStatus('success')
      router.push(routesNames.LOGIN)
    } else if (authState?.forgotChangePassword?.error?.meta) {
      setMessage(authState.forgotChangePassword.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.forgotChangePassword])

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
  const onClickChangePasswordButton = (e) => {
    e.preventDefault()
    let isValid = simpleValidator.current.allValid()

    if (!isValid) {
      simpleValidator.current.showMessages(true)
      forceUpdate(1)
    }
    if (simpleValidator.current.allValid() && values.type === 'forgot-password') {
      props.actions.forgotChangePasswordAction(values, values?.type)
    }
  }
  return (
    <MyDiv>
      {authState?.forgotChangePassword?.loading &&
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
                            Password
                          </Typography>
                          <CustomTextBox
                            type="password"
                            name="password"
                            value={values.password}
                            //fieldlabel="Password"
                            onChange={onChangeInput('password')}
                            onBlur={() => simpleValidator.current.showMessageFor('password')}
                            error={authState?.forgotChangePassword?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                            helperText={authState?.forgotChangePassword?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Confirmation Password
                          </Typography>
                          <CustomTextBox
                            type="password"
                            name="password_confirmation"
                            value={values.password_confirmation}
                            //fieldlabel="Confirmation password"
                            onChange={onChangeInput('password_confirmation')}
                            onBlur={() => simpleValidator.current.showMessageFor('password_confirmation')}
                            error={authState?.forgotChangePassword?.error?.errors?.password_confirmation ||
                               simpleValidator.current.message('password_confirmation', values.password_confirmation, 'required')}
                            helperText={authState?.forgotChangePassword?.error?.errors?.password_confirmation ||
                               simpleValidator.current.message('password_confirmation', values.password_confirmation, 'required')}
                          />
                        </Box>
                        <Box>
                          <CustomButton type="submit" fieldlabel="Submit" onClick={onClickChangePasswordButton} variant="contained" className="text-font action_button" />
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
)(ForgotChangePassword)
