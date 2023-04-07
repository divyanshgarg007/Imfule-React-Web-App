import * as authServices from '../../services/authServices'
import {setToken, getToken, removeToken} from '../../utilities/authUtils'
import * as actionTypes from './actionsType'
const checkSessionRequest = () => {
  return {
    type: actionTypes.USER_SESSION_REQUEST,
  }
}

const checkSessionSuccess = (welcomePage) => {
  return {
    type: actionTypes.USER_SESSION_SUCCESS,
    payload: welcomePage,
  }
}

const checkSessionFailure = (error) => {
  return {
    type: actionTypes.USER_SESSION_FAILURE,
    payload: error,
  }
}
export const checkSession = () =>
  async(dispatch) => {
    if (getToken('token')) {
      dispatch(checkSessionRequest())
      try {
        const responseData = await authServices.checkSession()
        if (responseData) {
          // need to put conditions for refresh token
        }
        if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
          dispatch(checkSessionSuccess(responseData.payload))
          setToken('companyID', responseData.payload.company_id)
        } else {
          dispatch(checkSessionFailure(responseData.errors))
        }
      } catch (error) {
        dispatch(checkSessionFailure(error.message))
      }
    }
  }


const signInRequest = () => {
  return {
    type: actionTypes.USER_SIGN_IN_REQUEST,
  }
}

const signInSuccess = (welcomePage) => {
  return {
    type: actionTypes.USER_SIGN_IN_SUCCESS,
    payload: welcomePage,
  }
}

const signInFailure = (error) => {
  return {
    type: actionTypes.USER_SIGN_IN_FAILURE,
    payload: error,
  }
}
export const signInAction = (data, type) =>

  async(dispatch) => {
    dispatch(signInRequest())
    try {
      const responseData = await authServices.signIn(data, type)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        if (responseData.payload.token) {
          setToken('token', responseData.payload.token)
        }
        if (responseData?.payload?.company_id && responseData?.payload?.shop_id) {
          setToken('companyID', responseData.payload.company_id)
          setToken('selectedStore', responseData.payload.shop_id)
        }
        dispatch(checkSession())
        dispatch(signInSuccess(responseData))
      } else {
        dispatch(signInFailure(responseData.errors))
      }
    } catch (error) {

      dispatch(signInFailure(error?.response?.data))
    }
  }
const signInShopifyResponseRequest = () => {
  return {
    type: actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_REQUEST,
  }
}

const signInShopifyResponseSuccess = (welcomePage) => {
  return {
    type: actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_SUCCESS,
    payload: welcomePage,
  }
}

const signInShopifyResponseFailure = (error) => {
  return {
    type: actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_FAILURE,
    payload: error,
  }
}
export const signInShopifyResponseAction = (code, hmac, host, shop, timestamp, type) =>
  async(dispatch) => {
    dispatch(signInShopifyResponseRequest())
    try {
      const responseData = await authServices.signInShopify(code, hmac, host, shop, timestamp, type)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        setToken('token', responseData.payload.token)
        setToken('companyID', responseData.payload.company_id)
        dispatch(signInShopifyResponseSuccess(responseData))
      } else {
        dispatch(signInShopifyResponseFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(signInShopifyResponseFailure(error?.response?.data))
    }
  }
const signUpSuccess = (data) => {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    payload: data,
  }
}
const signUpRequest = () => {
  return {
    type: actionTypes.USER_SIGNUP_REQUEST,
  }
}

const signUpFailure = (error) => {
  return {
    type: actionTypes.USER_SIGNUP_FAILURE,
    payload: error,
  }
}
export const signUpAction = (userData) =>
  async(dispatch) => {
    dispatch(signUpRequest())
    try {
      const responseData = await authServices.signup(userData)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(signUpSuccess(responseData))
        if (responseData.payload.otp_id) {
          setToken('otp_id', responseData.payload.otp_id)
        }
      } else {
        dispatch(signUpFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(signUpFailure(error?.response?.data))
    }
  }


const cleanUpStateRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_STATE_REQUEST,
  }
}


export const cleanUpState = () =>
  async(dispatch) => {
    dispatch(cleanUpStateRequest())

  }

const updateProfileRequest = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_REQUEST,
  }
}

const updateProfileSuccess = (welcomePage) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    payload: welcomePage,
  }
}

const updateProfileFailure = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAILURE,
    payload: error,
  }
}

export const updateProfileAction = (form) =>
  async(dispatch) => {
    dispatch(updateProfileRequest())
    try {
      let responseData = await authServices.updateProfile(form)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(updateProfileSuccess(responseData))
        dispatch(checkSession())
      } else {
        dispatch(updateProfileFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(updateProfileFailure(error?.response?.data))
    }
  }

const changePasswordRequest = () => {
  return {
    type: actionTypes.CHANGE_PASSWORD_REQUEST,
  }
}

const changePasswordSuccess = (welcomePage) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: welcomePage,
  }
}

const changePasswordFailure = (error) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAILURE,
    payload: error,
  }
}

export const changePassword = (data) =>
  async(dispatch) => {
    dispatch(changePasswordRequest())
    try {
      let responseData = await authServices.changePassword(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(changePasswordSuccess(responseData))
      } else {
        dispatch(changePasswordFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(changePasswordFailure(error?.response?.data))
    }
  }

const setPasswordRequest = () => {
  return {
    type: actionTypes.SET_PASSWORD_REQUEST,
  }
}

const setPasswordSuccess = (welcomePage) => {
  return {
    type: actionTypes.SET_PASSWORD_SUCCESS,
    payload: welcomePage,
  }
}

const setPasswordFailure = (error) => {
  return {
    type: actionTypes.SET_PASSWORD_FAILURE,
    payload: error,
  }
}

export const setPassword = (data) =>
  async(dispatch) => {
    dispatch(setPasswordRequest())
    try {
      let responseData = await authServices.setPassword(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(setPasswordSuccess(responseData))
        dispatch(checkSession())
      } else {
        dispatch(setPasswordFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(setPasswordFailure(error?.response?.data))
    }
  }
const logoutRequest = () => {
  return {
    type: actionTypes.USER_SIGN_OUT_REQUEST,
  }
}

const logoutSuccess = (payload) => {
  return {
    type: actionTypes.USER_SIGN_OUT_SUCCESS,
    payload: payload,
  }
}

const logoutFailure = (error) => {
  return {
    type: actionTypes.USER_SIGN_OUT_FAILURE,
    payload: error,
  }
}


export const logout = () =>
  async(dispatch) => {
    dispatch(logoutRequest())
    try {
      let responseData = await authServices.userLogout()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(logoutSuccess(responseData))
      } else {
        dispatch(logoutFailure(responseData))
      }
    } catch (error) {
      dispatch(logoutFailure(error))
    }
  }

export const logoutValidUser = (data) =>
  async(dispatch) => {
    dispatch(logoutSuccess(data))
  }
const forgotSendOTPRequest = () => {
  return {
    type: actionTypes.FORGOT_SEND_OTP_REQUEST,
  }
}

const forgotSendOTPSuccess = (welcomePage) => {
  return {
    type: actionTypes.FORGOT_SEND_OTP_SUCCESS,
    payload: welcomePage,
  }
}

const forgotSendOTPFailure = (error) => {
  return {
    type: actionTypes.FORGOT_SEND_OTP_FAILURE,
    payload: error,
  }
}

export const forgotSendOTPAction = (data) =>
  async(dispatch) => {
    dispatch(forgotSendOTPRequest())
    try {
      let responseData = await authServices.forgotSentOTP(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        setToken('otp_id', responseData.payload.otp_id)
        setToken('otp', responseData.payload.otp)
        dispatch(forgotSendOTPSuccess(responseData))
      } else {
        dispatch(forgotSendOTPFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(forgotSendOTPFailure(error?.response?.data))
    }
  }

const forgotVerifyOTPRequest = () => {
  return {
    type: actionTypes.FORGOT_VERIFY_OTP_REQUEST,
  }
}

const forgotVerifyOTPSuccess = (welcomePage) => {
  return {
    type: actionTypes.FORGOT_VERIFY_OTP_SUCCESS,
    payload: welcomePage,
  }
}

const forgotVerifyOTPFailure = (error) => {
  return {
    type: actionTypes.FORGOT_VERIFY_OTP_FAILURE,
    payload: error,
  }
}

export const forgotVerifyOTPAction = (otp, type) =>
  async(dispatch) => {
    dispatch(forgotVerifyOTPRequest())
    const otpID = getToken('otp_id')
    try {
      let responseData = await authServices.forgotVerifyOTP(otpID, otp, type)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(forgotVerifyOTPSuccess(responseData))
      } else {
        dispatch(forgotVerifyOTPFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(forgotVerifyOTPFailure(error?.response?.data))
    }
  }

const forgotChangePasswordRequest = () => {
  return {
    type: actionTypes.FORGOT_CHANGE_PASSWORD_REQUEST,
  }
}

const forgotChangePasswordSuccess = (welcomePage) => {
  return {
    type: actionTypes.FORGOT_CHANGE_PASSWORD_SUCCESS,
    payload: welcomePage,
  }
}

const forgotChangePasswordFailure = (error) => {
  return {
    type: actionTypes.FORGOT_CHANGE_PASSWORD_FAILURE,
    payload: error,
  }
}

export const forgotChangePasswordAction = (form, type) =>
  async(dispatch) => {
    dispatch(forgotChangePasswordRequest())
    const otpID = getToken('otp_id')
    const otp = getToken('otp')
    try {
      let responseData = await authServices.forgotChangePassword(otpID, otp, form, type)
      removeToken('otp_id')
      removeToken('otp')
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(forgotChangePasswordSuccess(responseData))
      } else {
        dispatch(forgotChangePasswordFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(forgotChangePasswordFailure(error?.response?.data))
    }
  }


const registerVerifyOTPRequest = () => {
  return {
    type: actionTypes.REGISTER_VERIFY_OTP_REQUEST,
  }
}

const registerVerifyOTPSuccess = (welcomePage) => {
  return {
    type: actionTypes.REGISTER_VERIFY_OTP_SUCCESS,
    payload: welcomePage,
  }
}

const registerVerifyOTPFailure = (error) => {
  return {
    type: actionTypes.REGISTER_VERIFY_OTP_FAILURE,
    payload: error,
  }
}

export const registerVerifyOTPAction = (otp, type) =>
  async(dispatch) => {
    dispatch(registerVerifyOTPRequest())
    const otpID = getToken('otp_id')
    try {
      let responseData = await authServices.registerVerifyOTP(otpID, otp, type)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(registerVerifyOTPSuccess(responseData))
        if (responseData.payload.token) {
          setToken('token', responseData.payload.token)
        }
      } else {
        dispatch(registerVerifyOTPRequest(responseData.errors))
      }
    } catch (error) {
      dispatch(registerVerifyOTPFailure(error?.response?.data))
    }
  }

const registerResendOTPRequest = () => {
  return {
    type: actionTypes.REGISTER_RESEND_OTP_REQUEST,
  }
}

const registerResendOTPSuccess = (welcomePage) => {
  return {
    type: actionTypes.REGISTER_RESEND_OTP_SUCCESS,
    payload: welcomePage,
  }
}

const registerResendOTPFailure = (error) => {
  return {
    type: actionTypes.REGISTER_RESEND_OTP_FAILURE,
    payload: error,
  }
}

export const registerResendOTPAction = (data) =>
  async(dispatch) => {
    dispatch(registerResendOTPRequest())
    try {
      let responseData = await authServices.registerResendOTP(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        setToken('otp_id', responseData.payload.otp_id)
        setToken('otp', responseData.payload.otp)
        dispatch(registerResendOTPSuccess(responseData))
      } else {
        dispatch(registerResendOTPFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(registerResendOTPFailure(error?.response?.data))
    }
  }
