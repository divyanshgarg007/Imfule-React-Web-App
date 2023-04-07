/* eslint-disable no-unused-vars */
import React, {useEffect, useState, createRef, useRef} from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import {Link, withRouter, useHistory} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
// import {CircularProgress} from '@material-ui/core'
import ReCAPTCHA from 'react-google-recaptcha'
import SimpleReactValidator from 'simple-react-validator'
import {ActionCreators} from '../../redux/actions'
import * as routesNames from '../../constants/routes'
import {CustomButton, CustomTextBox, AuthTopPanel, Snackbar, AuthRightPanel, Loader} from '../../components'
import {StoreAddress, PrestashopStepsDialog, PrestashopStoreAddress} from '../../components/StoreListingDialog/components'
import Welcome from '../../images/logo.png'
import Shopify from '../../images/shopify.png'
import Prestashop from '../../images/prestashop.png'
import MyDiv from './signup.style'
const Signup = React.memo((props) => {
  const router = useHistory()
  const authState = useSelector((state) => state.authState)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')
  const [storeAddress, setStoreAddress] = useState('')
  const [OpenBox, setOpenBox] = useState(false)
  const [OpenSteps, setOpenSteps] = useState(false)
  const siteKey = process?.env?.REACT_APP_SITE_KEY
  const recaptchaRef = createRef()
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [prestaShopData, setPrestaShopData] = useState({
    storeName: '',
    storeUrl: '',
    key: '',
  })
  const [openPrestashop, setOpenPrestashop] = useState(false)

  const handlePrestashop = () => {
    setOpenPrestashop(false)
    props.actions.cleanUpState()
    setPrestaShopData({
      storeName: '',
      storeUrl: '',
      key: '',
    })
  }
  const handlePrestaShopChange = (prop) => (event) => {
    setPrestaShopData({
      ...prestaShopData,
      [prop]: event.target.value,
    })
  }
  // const handleNextPrestashop = () => {
  //   setOpenSteps(true)
  //   props.handleListing()
  // }
  const handleStoreAddressChange = (e) => {
    setStoreAddress(e.target.value)
  }
  const handleClose = () => {
    setOpenBox(false)
    setStoreAddress('')
    props.actions.cleanUpState()
  }
  const handleSteps = () => {
    setOpenSteps(false)
    setOpenPrestashop(true)
  }
  const onChangeInput = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }
  useEffect(() => {
    if (authState?.signIn?.data?.payload) {
      if (authState?.signIn?.data?.payload?.url) {
        window.location.href = authState.signIn.data.payload.url
      } else {
        if (authState?.signIn?.data?.payload?.company_id) {
          props.actions.importScriptAction('prestashop', authState?.signIn?.data?.payload?.shop_id)
        }
        setMessage(authState.signIn.data.meta?.message)
        setStatus('success')
        router.push(routesNames.DASHBOARD)
      }
    } else if (authState?.signIn?.error?.meta) {
      setMessage(authState.signIn.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.signIn])

  useEffect(() => {
    if (authState?.signUp?.data?.payload) {
      setMessage(authState.signUp.data.meta?.message)
      setStatus('success')
      router.push(routesNames.VERIFY_OTP, {type: 'register', email: values.email})
    } else if (authState?.signUp?.error?.meta) {
      setMessage(authState.signUp.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.signUp])

  useEffect(() => {
    return () => {
      props.actions.cleanUpState()
    }
  }, [])

  const handleUserSignUp = (e) => {
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
    props.actions.signUpAction(values)
  }
  const onExpired = () => {
    recaptchaRef.current.reset()
    recaptchaRef.current.execute()
  }
  const handleUserSignUpShopify = (shopType) => {
    if (shopType === 'shopify') {
      let data = {
        shop_url: storeAddress,
      }
      props.actions.signInAction(data, shopType)
    } else if (shopType === 'prestashop') {
      let data = {
        shop_name: prestaShopData?.storeName,
        shop_url: prestaShopData?.storeUrl,
        key: prestaShopData?.key,
      }
      props.actions.signInAction(data, shopType)
    }
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  // const handleClosePrestashop = () => {
  //   setPrestaShopData({
  //     storeName: '',
  //     storeUrl: '',
  //     key: '',
  //   })
  // }
  const handleClosePrestashop = () => {
    setOpenSteps(false)
    props.actions.cleanUpState()
  }
  return (
    <MyDiv>
      {authState?.signUp?.loading &&
      <div>

        <Loader />
      </div>
      }
      <Box>
        <Grid container className="auth-container">
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
          <StoreAddress
            openPopup={OpenBox}
            closePopup={setOpenBox}
            handleSubmit={handleUserSignUpShopify}
            handleChange={handleStoreAddressChange}
            storeAddress={storeAddress}
            handleShopify={handleClose}
            error={authState?.signIn?.error?.errors?.shop_url[0]}
            loading={authState?.signIn?.loading}
          />
          <PrestashopStepsDialog
            openSteps={OpenSteps}
            handleSteps={handleSteps}
            // handleSubmit={handleUserSignUpShopify}
            // handleChange={handlePrestaShopChange}
            // form={prestaShopData}
            // loading={authState?.signIn?.loading}
            handleClosePrestashop={handleClosePrestashop}
          />
          <PrestashopStoreAddress
            openStore={openPrestashop}
            handlePrestashop={handlePrestashop}
            handleSubmit={handleUserSignUpShopify}
            handleChange={handlePrestaShopChange}
            form={prestaShopData}
            error={authState?.signIn?.error?.errors?.shop_url[0]}
            loading={authState?.signIn?.loading}
          />
          <Grid item md={4} xs={12} sm={5}>
            <Box className="left-side">
              <div className="sign_in">
                <div className="welcome_img">
                  <img src={Welcome} alt="pic" />
                </div>
                <Card className="custom-card">
                  <CardContent className="custom-card-content">
                    <AuthTopPanel
                      title="Sign up for FREE!"
                      separate="OR"
                      shopifyImg={Shopify}
                      buttontitle="Shopify"
                      OpenBox={OpenBox}
                      setOpenBox={setOpenBox}
                      PrestashopImg={Prestashop}
                      buttontitlePrestashop="Prestashop"
                      OpenSteps={OpenSteps}
                      setOpenSteps={setOpenSteps}
                    />
                  </CardContent>
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
                      Sign up with Imfule
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#333"
                      className="signin_subheading"
                      textAlign="center"
                    >
                      Already Have Account ?&nbsp;
                      <Link to={routesNames.LOGIN} style={{textDecoration: 'none', color: '#1976d2'}}>
                        Login
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
                            Name
                          </Typography>
                          <CustomTextBox
                            type="text"
                            name="name"
                            value={values.name}
                            //fieldlabel="Name"
                            onChange={onChangeInput('name')}
                            onBlur={() => simpleValidator.current.showMessageFor('name')}
                            error={authState?.signUp?.error?.errors?.name || simpleValidator.current.message('name', values.name, 'required')}
                            helperText={authState?.signUp?.error?.errors?.name || simpleValidator.current.message('name', values.name, 'required')}
                          />
                        </Box>
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
                            error={authState?.signUp?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                            helperText={authState?.signUp?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                          />
                        </Box>
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
                            error={authState?.signUp?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                            helperText={authState?.signUp?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontSize="0.9rem"
                            className="text-font"
                          >
                            Confirm Password
                          </Typography>
                          <CustomTextBox
                            type="password"
                            name="passwordConfirmation"
                            value={values.passwordConfirmation}
                            // fieldlabel="Confirm password"
                            onChange={onChangeInput('passwordConfirmation')}
                            onBlur={() => simpleValidator.current.showMessageFor('passwordConfirmation')}
                            error={authState?.signUp?.error?.errors?.password_confirmation || simpleValidator.current.message('passwordConfirmation', values.passwordConfirmation, 'required')}
                            helperText={authState?.signUp?.error?.errors?.password_confirmation || simpleValidator.current.message('passwordConfirmation', values.passwordConfirmation, 'required')}
                          />
                        </Box>
                        <Box>
                          <CustomButton type="submit" fieldlabel="Sign up" variant="contained" onClick={handleUserSignUp} className="text-font action_button" />
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
)(Signup)
