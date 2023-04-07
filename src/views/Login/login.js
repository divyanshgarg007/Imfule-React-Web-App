import React, {useEffect, useState, createRef, useRef} from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import {Link, withRouter, useHistory} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import ReCAPTCHA from 'react-google-recaptcha'
import SimpleReactValidator from 'simple-react-validator'
import {ActionCreators} from '../../redux/actions'
import {CustomButton, CustomTextBox, AuthTopPanel, Snackbar, AuthRightPanel, Loader} from '../../components'
import {StoreAddress, PrestashopStepsDialog, PrestashopStoreAddress} from '../../components/StoreListingDialog/components'
import Welcome from '../../images/logo.png'
import Shopify from '../../images/shopify.png'
import Prestashop from '../../images/prestashop.png'
import * as routesNames from '../../constants/routes'
import MyDiv from './login.style'

const Login = React.memo((props) => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('success')
  const router = useHistory()
  const authState = useSelector((state) => state.authState)
  const [OpenBox, setOpenBox] = useState(false)
  const [OpenSteps, setOpenSteps] = useState(false)
  const [storeAddress, setStoreAddress] = useState('')
  const siteKey = process.env.REACT_APP_SITE_KEY
  const recaptchaRef = createRef()
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })
  const [prestaShopData, setPrestaShopData] = useState({
    storeName: '',
    storeUrl: '',
    key: '',
  })
  const [openPrestashop, setOpenPrestashop] = useState(false)

  const handlePrestashop = () => {
    props.actions.cleanUpState()
    setOpenPrestashop(false)
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
    if (authState?.shopifyResponse?.error?.meta) {
      setMessage(authState.shopifyResponse.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.shopifyResponse])
  useEffect(() => {
    return () => {
      props.actions.cleanUpState()
    }
  }, [])

  const handleUserSignIn = (e) => {
    props.actions.cleanUpState()
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
  const handleUserSignInShopify = (shopType) => {
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
  const onChange = () => {
    let data = {}
    data = {
      email: values.email,
      password: values.password,
    }
    props.actions.signInAction(data, 'login')
  }
  const onExpired = () => {
    recaptchaRef.current.reset()
    recaptchaRef.current.execute()
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
      {authState?.signIn?.loading &&
      <div>
        <Loader />
      </div>
      }
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={siteKey}
        onChange={onChange}
        onExpired={onExpired}
      />
      <Box>
        <Grid container className="auth-container">
          <Snackbar
            message={message}
            severity={status}
            duration={2500}
            open={message.length > 0}
            close={handleSnackBarClose}
          />
          <StoreAddress
            openPopup={OpenBox}
            closePopup={setOpenBox}
            handleSubmit={handleUserSignInShopify}
            handleChange={handleStoreAddressChange}
            storeAddress={storeAddress}
            handleShopify={handleClose}
            error={authState?.signIn?.error?.errors?.shop_url[0]}
            loading={authState?.signIn?.loading}
          />
          <PrestashopStepsDialog
            openSteps={OpenSteps}
            handleSteps={handleSteps}
            // handleSubmit={handleUserSignInShopify}
            // handleChange={handlePrestaShopChange}
            // form={prestaShopData}
            // loading={authState?.signIn?.loading}
            handleClosePrestashop={handleClosePrestashop}
          />
          <PrestashopStoreAddress
            openStore={openPrestashop}
            handlePrestashop={handlePrestashop}
            handleSubmit={handleUserSignInShopify}
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
                      title="Sign in using your Store"
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
                      Sign in to Imfule
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#333"
                      className="signin_subheading"
                      textAlign="center"
                    >
                      Need Here ?&nbsp;
                      <Link to={routesNames.SIGNUP} style={{textDecoration: 'none', color: '#1976d2'}}>
                        Create an account
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
                            //fieldlabel="Enter Email"
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={onChangeInput('email')}
                            onBlur={() => simpleValidator.current.showMessageFor('email')}
                            error={authState?.signIn?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                            helperText={authState?.signIn?.error?.errors?.email || simpleValidator.current.message('email', values.email, 'required|email')}
                          />
                          {/* {simpleValidator.current.message('email', values.email, 'required|email')} */}
                        </Box>
                        <Box>
                          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography
                              variant="h6"
                              color="text.primary"
                              fontSize="0.9rem"
                              className="text-font"
                            >
                              Password
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              className="text-font"
                              fontWeight="500"
                            >
                              <Link to={routesNames.FORGOT_PASSWORD} style={{textDecoration: 'none', color: '#1976d2', fontSize: '0.9rem'}}>
                                Forgot password
                              </Link>
                            </Typography>
                          </Box>
                          <CustomTextBox
                            //fieldlabel="Enter Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={onChangeInput('password')}
                            onBlur={() => simpleValidator.current.showMessageFor('password')}
                            error={authState?.signIn?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                            helperText={authState?.signIn?.error?.errors?.password || simpleValidator.current.message('password', values.password, 'required')}
                          />
                        </Box>
                        <Box>
                          <CustomButton type="submit"
                            fieldlabel="Sign in"
                            variant="contained"
                            onClick={handleUserSignIn}
                            className="text-font action_button"
                          />
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
)(Login)
