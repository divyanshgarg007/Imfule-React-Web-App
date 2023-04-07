import * as actionTypes from '../actions/actionsType'


const INITIAL_STATE = {
  signIn: {
    data: null,
    loading: false,
    error: null,
  },
  signUp: {
    data: null,
    loading: false,
    error: null,
  },
  session: {
    data: null,
    loading: false,
    error: null,
  },
  shopifyResponse: {
    data: null,
    loading: false,
    error: null,
  },
  updateProfile: {
    data: null,
    loading: false,
    error: null,
  },
  changePassword: {
    data: null,
    loading: false,
    error: null,
  },
  setPassword: {
    data: null,
    loading: false,
    error: null,
  },
  signOut: {
    data: null,
    loading: false,
    error: null,
  },
  forgotSendOTP: {
    data: null,
    loading: false,
    error: null,
  },
  forgotVerifyOTP: {
    data: null,
    loading: false,
    error: null,
  },
  registerVerifyOTP: {
    data: null,
    loading: false,
    error: null,
  },
  forgotChangePassword: {
    data: null,
    loading: false,
    error: null,
  },
  registerResendOTP: {
    data: null,
    loading: false,
    error: null,
  },
}
const authReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGN_IN_REQUEST:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.USER_SIGN_IN_FAILURE:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.USER_SESSION_REQUEST:
      return {
        ...state,
        session: {
          ...state.session,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.USER_SESSION_SUCCESS:
      return {
        ...state,
        session: {
          ...state.session,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.USER_SESSION_FAILURE:
      return {
        ...state,
        session: {
          ...state.session,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_REQUEST:
      return {
        ...state,
        shopifyResponse: {
          ...state.session,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_SUCCESS:
      return {
        ...state,
        shopifyResponse: {
          ...state.session,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.USER_SIGN_IN_SHOPIFY_RESPONSE_FAILURE:
      return {
        ...state,
        shopifyResponse: {
          ...state.session,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.CLEAN_UP_STATE_REQUEST:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          error: null,
          data: null,
        },
        signUp: {
          ...state.signUp,
          error: null,
          data: null,
        },
        shopifyResponse: {
          ...state.shopifyResponse,
          error: null,
          data: null,
        },
        signOut: {
          ...state.signOut,
          error: null,
          data: null,
        },
        changePassword: {
          ...state.changePassword,
          error: null,
          data: null,
        },
        setPassword: {
          ...state.setPassword,
          error: null,
          data: null,
        },
        updateProfile: {
          ...state.updateProfile,
          error: null,
          data: null,
        },
        forgotSendOTP: {
          ...state.forgotSendOTP,
          error: null,
          data: null,
        },
        registerResendOTP: {
          ...state.registerResendOTP,
          error: null,
          data: null,
        },
        forgotVerifyOTP: {
          ...state.forgotVerifyOTP,
          error: null,
          data: null,
        },
        registerVerifyOTP: {
          ...state.registerVerifyOTP,
          error: null,
          data: null,
        },
        forgotChangePassword: {
          ...state.forgotChangePassword,
          error: null,
          data: null,
        },
      }
    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateProfile: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfile: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updateProfile: {
          ...state.updateProfile,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePassword: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.SET_PASSWORD_REQUEST:
      return {
        ...state,
        setPassword: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        setPassword: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.SET_PASSWORD_FAILURE:
      return {
        ...state,
        setPassword: {
          ...state.setPassword,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.USER_SIGN_OUT_REQUEST:
      return {
        ...state,
        signOut: {
          ...state.signOut,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOut: {
          ...state.signOut,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.USER_SIGN_OUT_FAILURE:
      return {
        ...state,
        signOut: {
          ...state.signOut,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.FORGOT_SEND_OTP_REQUEST:
      return {
        ...state,
        forgotSendOTP: {
          ...state.forgotSendOTP,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.FORGOT_SEND_OTP_SUCCESS:
      return {
        ...state,
        forgotSendOTP: {
          ...state.forgotSendOTP,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.FORGOT_SEND_OTP_FAILURE:
      return {
        ...state,
        forgotSendOTP: {
          ...state.forgotSendOTP,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.REGISTER_RESEND_OTP_REQUEST:
      return {
        ...state,
        registerResendOTP: {
          ...state.registerResendOTP,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.REGISTER_RESEND_OTP_SUCCESS:
      return {
        ...state,
        registerResendOTP: {
          ...state.registerResendOTP,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.REGISTER_RESEND_OTP_FAILURE:
      return {
        ...state,
        registerResendOTP: {
          ...state.registerResendOTP,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.FORGOT_VERIFY_OTP_REQUEST:
      return {
        ...state,
        forgotVerifyOTP: {
          ...state.forgotVerifyOTP,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.FORGOT_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        forgotVerifyOTP: {
          ...state.forgotVerifyOTP,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.FORGOT_VERIFY_OTP_FAILURE:
      return {
        ...state,
        forgotVerifyOTP: {
          ...state.forgotVerifyOTP,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.REGISTER_VERIFY_OTP_REQUEST:
      return {
        ...state,
        registerVerifyOTP: {
          ...state.registerVerifyOTP,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.REGISTER_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        registerVerifyOTP: {
          ...state.registerVerifyOTP,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.REGISTER_VERIFY_OTP_FAILURE:
      return {
        ...state,
        registerVerifyOTP: {
          ...state.registerVerifyOTP,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.FORGOT_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        forgotChangePassword: {
          ...state.forgotChangePassword,
          data: null,
          loading: true,
          error: null,
          status: null,
        },
      }
    case actionTypes.FORGOT_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotChangePassword: {
          ...state.forgotChangePassword,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.FORGOT_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        forgotChangePassword: {
          ...state.forgotChangePassword,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default authReducers
