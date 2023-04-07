import * as userServices from '../../services/userServices'
import {setToken, removeToken} from '../../utilities/authUtils'
import * as actionTypes from './actionsType'

const getStoreRequest = () => {
  return {
    type: actionTypes.GET_STORE_LIST_REQUEST,
  }
}

const getStoreFailure = (error) => {
  return {
    type: actionTypes.GET_STORE_LIST_FAILURE,
    payload: error,
  }
}

const getStoreSuccess = (data) => {
  return {
    type: actionTypes.GET_STORE_LIST_SUCCESS,
    payload: data,
  }
}

export const getStoreAction = (form) =>
  async(dispatch) => {
    dispatch(getStoreRequest())
    try {
      const responseData = await userServices.getStore(form)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getStoreSuccess(responseData))
      } else {
        dispatch(getStoreFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getStoreFailure(error?.response?.data))
    }
  }


const addStoreRequest = () => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_REQUEST,
  }
}

const addStoreFailure = (error) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_FAILURE,
    payload: error,
  }
}

const addStoreSuccess = (data) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_SUCCESS,
    payload: data,
  }
}

export const addStoreAction = (shopType, form) =>
  async(dispatch) => {
    dispatch(addStoreRequest())
    try {
      const responseData = await userServices.addStore(shopType, form)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(addStoreSuccess(responseData))
      } else {
        dispatch(addStoreFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(addStoreFailure(error?.response?.data))
    }
  }

const addStoreResponseRequest = () => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_RESPONSE_REQUEST,
  }
}

const addStoreResponseFailure = (error) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_RESPONSE_FAILURE,
    payload: error,
  }
}

const addStoreResponseSuccess = (data) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_RESPONSE_SUCCESS,
    payload: data,
  }
}

export const addStoreResponseAction = (code, hmac, host, shop, timestamp) =>
  async(dispatch) => {
    dispatch(addStoreResponseRequest())
    try {
      const responseData = await userServices.addStoreResponse(code, hmac, host, shop, timestamp)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(addStoreResponseSuccess(responseData))
      } else {
        dispatch(addStoreResponseFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(addStoreResponseFailure(error?.response?.data))
    }
  }

const addStoreInstallRequest = () => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_INSTALL_REQUEST,
  }
}

const addStoreInstallFailure = (error) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_INSTALL_FAILURE,
    payload: error,
  }
}

const addStoreInstallSuccess = (data) => {
  return {
    type: actionTypes.ADD_STORE_SHOPIFY_INSTALL_SUCCESS,
    payload: data,
  }
}

export const addStoreInstallAction = (hmac, host, shop, timestamp, shopType) =>
  async(dispatch) => {
    dispatch(addStoreInstallRequest())
    try {
      const responseData = await userServices.addStoreInstall(hmac, host, shop, timestamp, shopType)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(addStoreInstallSuccess(responseData))
      } else {
        dispatch(addStoreInstallFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(addStoreInstallFailure(error?.response?.data))
    }
  }

const deleteStoreRequest = () => {
  return {
    type: actionTypes.DELETE_STORE_REQUEST,
  }
}

const deleteStoreFailure = (error) => {
  return {
    type: actionTypes.DELETE_STORE_FAILURE,
    payload: error,
  }
}

const deleteStoreSuccess = (data) => {
  return {
    type: actionTypes.DELETE_STORE_SUCCESS,
    payload: data,
  }
}

export const deleteStoreAction = (shopID) =>
  async(dispatch) => {
    dispatch(deleteStoreRequest())
    try {
      const responseData = await userServices.deleteStore(shopID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(deleteStoreSuccess(responseData))
        dispatch(getStoreAction())
      } else {
        dispatch(deleteStoreFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(deleteStoreFailure(error?.response?.data))
    }
  }

//Social-media

const addSocialMediaRequest = () => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_REQUEST,
  }
}

const addSocialMediaFailure = (error) => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_FAILURE,
    payload: error,
  }
}

const addSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  }
}

export const addSocialMediaAction = (code, hmac, host, shop, timestamp) =>
  async(dispatch) => {
    dispatch(addSocialMediaRequest())
    try {
      const responseData = await userServices.addSocialMedia(code, hmac, host, shop, timestamp)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        if (responseData?.payload?.request_token_secret) {
          setToken('request_token_secret', responseData?.payload?.request_token_secret)
        }
        dispatch(addSocialMediaSuccess(responseData))
      } else {
        dispatch(addSocialMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(addSocialMediaFailure(error?.response?.data))
    }
  }

const addSocialMediaResponseRequest = () => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_REQUEST,
  }
}

const addSocialMediaResponseFailure = (error) => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_FAILURE,
    payload: error,
  }
}

const addSocialMediaResponseSuccess = (data) => {
  return {
    type: actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_SUCCESS,
    payload: data,
  }
}

export const addSocialMediaResponseAction = (code, media) =>
  async(dispatch) => {
    dispatch(addSocialMediaResponseRequest())
    removeToken('request_token_secret')
    try {
      const responseData = await userServices.addSocialMediaResponse(code, media)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(addSocialMediaResponseSuccess(responseData))
      } else {
        dispatch(addSocialMediaResponseFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(addSocialMediaResponseFailure(error?.response?.data))
    }
  }

const getSocialMediaListRequest = () => {
  return {
    type: actionTypes.GET_SOCIAL_MEDIA_LIST_REQUEST,
  }
}

const getSocialMediaListFailure = (error) => {
  return {
    type: actionTypes.GET_SOCIAL_MEDIA_LIST_FAILURE,
    payload: error,
  }
}

const getSocialMediaListSuccess = (data) => {
  return {
    type: actionTypes.GET_SOCIAL_MEDIA_LIST_SUCCESS,
    payload: data,
  }
}

export const getSocialMediaListAction = () =>
  async(dispatch) => {
    dispatch(getSocialMediaListRequest())
    try {
      const responseData = await userServices.getSocialMediaList()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getSocialMediaListSuccess(responseData))
      } else {
        dispatch(getSocialMediaListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getSocialMediaListFailure(error?.response?.data))
    }
  }
const connectedSocialMediaWithShopsRequest = () => {
  return {
    type: actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_REQUEST,
  }
}

const connectedSocialMediaWithShopsFailure = (error) => {
  return {
    type: actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_FAILURE,
    payload: error,
  }
}

const connectedSocialMediaWithShopsSuccess = (data) => {
  return {
    type: actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_SUCCESS,
    payload: data,
  }
}

export const connectedSocialMediaWithShopsAction = () =>
  async(dispatch) => {
    dispatch(connectedSocialMediaWithShopsRequest())
    try {
      const responseData = await userServices.connectedSocialMediaWithShops()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(connectedSocialMediaWithShopsSuccess(responseData))
      } else {
        dispatch(connectedSocialMediaWithShopsFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(connectedSocialMediaWithShopsFailure(error?.response?.data))
    }
  }

const connectShopsToSocialMediaRequest = () => {
  return {
    type: actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_REQUEST,
  }
}

const connectShopsToSocialMediaFailure = (error) => {
  return {
    type: actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_FAILURE,
    payload: error,
  }
}

const connectShopsToSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  }
}

export const connectShopsToSocialMediaAction = (data) =>
  async(dispatch) => {
    dispatch(connectShopsToSocialMediaRequest())
    try {
      const responseData = await userServices.connectShopsToSocialMedia(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(connectShopsToSocialMediaSuccess(responseData))
        dispatch(getSocialMediaListAction())
        dispatch(connectedSocialMediaWithShopsAction())
      } else {
        dispatch(connectShopsToSocialMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(connectShopsToSocialMediaFailure(error?.response?.data))
    }
  }

const deleteSocialMediaRequest = () => {
  return {
    type: actionTypes.DELETE_SOCIAL_MEDIA_REQUEST,
  }
}

const deleteSocialMediaFailure = (error) => {
  return {
    type: actionTypes.DELETE_SOCIAL_MEDIA_FAILURE,
    payload: error,
  }
}

const deleteSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.DELETE_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  }
}

export const deleteSocialMediaAction = (socialMediaId) =>
  async(dispatch) => {
    dispatch(deleteSocialMediaRequest())
    try {
      const responseData = await userServices.deleteSocialMedia(socialMediaId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(deleteSocialMediaSuccess(responseData))
        dispatch(getSocialMediaListAction())
        dispatch(connectedSocialMediaWithShopsAction())
      } else {
        dispatch(deleteSocialMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(deleteSocialMediaFailure(error?.response?.data))
    }
  }

const changeSocialMediaStatusRequest = () => {
  return {
    type: actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_REQUEST,
  }
}

const changeSocialMediaStatusFailure = (error) => {
  return {
    type: actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_FAILURE,
    payload: error,
  }
}

const changeSocialMediaStatusSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_SUCCESS,
    payload: data,
  }
}

export const changeSocialMediaStatusAction = (socialMediaId, status) =>
  async(dispatch) => {
    dispatch(changeSocialMediaStatusRequest())
    try {
      const responseData = await userServices.changeSocialMediaStatus(socialMediaId, status)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(changeSocialMediaStatusSuccess(responseData))
        dispatch(getSocialMediaListAction())
        dispatch(connectedSocialMediaWithShopsAction())
      } else {
        dispatch(changeSocialMediaStatusFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(changeSocialMediaStatusFailure(error?.response?.data))
    }
  }

const connectedPagesWithSocialMediaRequest = () => {
  return {
    type: actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_REQUEST,
  }
}

const connectedPagesWithSocialMediaFailure = (error) => {
  return {
    type: actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_FAILURE,
    payload: error,
  }
}

const connectedPagesWithSocialMediaSuccess = (idx, data) => {
  return {
    type: actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_SUCCESS,
    payload: data,
    index: idx,
  }
}

export const connectedPagesWithSocialMediaAction = (idx, socialMediaID) =>
  async(dispatch) => {
    dispatch(connectedPagesWithSocialMediaRequest())
    try {
      const responseData = await userServices.getConnectedPagesWithSocialMedia(socialMediaID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(connectedPagesWithSocialMediaSuccess(idx, responseData))
      } else {
        dispatch(connectedPagesWithSocialMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(connectedPagesWithSocialMediaFailure(error?.response?.data))
    }
  }

const postOnSocialMediaRequest = () => {
  return {
    type: actionTypes.POST_ON_SOCIAL_MEDIA_REQUEST,
  }
}

const postOnSocialMediaFailure = (error) => {
  return {
    type: actionTypes.POST_ON_SOCIAL_MEDIA_FAILURE,
    payload: error,
  }
}

const postOnSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.POST_ON_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  }
}

export const postOnSocialMediaAction = (addPostData) =>
  async(dispatch) => {
    dispatch(postOnSocialMediaRequest())
    try {
      const responseData = await userServices.postOnSocialMedia(addPostData)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(postOnSocialMediaSuccess(responseData))
      } else {
        dispatch(postOnSocialMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(postOnSocialMediaFailure(error?.response?.data))
    }
  }

const cleanUpStateStoreRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_USER_STATE_REQUEST,
  }
}

export const cleanUpStateStore = () =>
  async(dispatch) => {
    dispatch(cleanUpStateStoreRequest())

  }

const getStepperRequest = () => {
  return {
    type: actionTypes.GET_STEPPER_REQUEST,
  }
}

const getStepperFailure = (error) => {
  return {
    type: actionTypes.GET_STEPPER_FAILURE,
    payload: error,
  }
}

const getStepperSuccess = (data) => {
  return {
    type: actionTypes.GET_STEPPER_SUCCESS,
    payload: data,
  }
}

export const getStepperAction = () =>
  async(dispatch) => {
    dispatch(getStepperRequest())
    try {
      const responseData = await userServices.getStepper()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getStepperSuccess(responseData))
      } else {
        dispatch(getStepperFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getStepperFailure(error?.response?.data))
    }
  }
// update time zone
const updateTimeZoneRequest = () => {
  return {
    type: actionTypes.UPDATE_TIMEZONE_REQUEST,
  }
}

const updateTimeZoneFailure = (error) => {
  return {
    type: actionTypes.UPDATE_TIMEZONE_FAILURE,
    payload: error,
  }
}

const updateTimeZoneSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_TIMEZONE_SUCCESS,
    payload: data,
  }
}

export const updateTimeZoneAction = (timezoneId, shopID) =>
  async(dispatch) => {
    dispatch(updateTimeZoneRequest())
    try {
      const responseData = await userServices.updateTimeZone(timezoneId, shopID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(updateTimeZoneSuccess(responseData))
        dispatch(getStoreAction())
      } else {
        dispatch(updateTimeZoneFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(updateTimeZoneFailure(error?.response?.data))
    }
  }
