import * as masterServices from '../../services/masterServices'
import {setToken} from '../../utilities/authUtils'
import * as actionTypes from './actionsType'

const getCountryListRequest = () => {
  return {
    type: actionTypes.GET_COUNTRY_REQUEST,
  }
}

const getCountryListSuccess = (countries) => {
  return {
    type: actionTypes.GET_COUNTRY_SUCCESS,
    payload: countries,
  }
}

const getCountryListFailure = (error) => {
  return {
    type: actionTypes.GET_COUNTRY_FAILURE,
    payload: error,
  }
}
export const getCountryList = () =>
  async(dispatch) => {
    dispatch(getCountryListRequest())
    try {
      const responseData = await masterServices.getCountries()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getCountryListSuccess(responseData))
      } else {
        dispatch(getCountryListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getCountryListFailure(error?.response?.data))
    }
  }

const getTimeZoneListRequest = () => {
  return {
    type: actionTypes.GET_TIMEZONE_REQUEST,
  }
}

const getTimeZoneListSuccess = (countries) => {
  return {
    type: actionTypes.GET_TIMEZONE_SUCCESS,
    payload: countries,
  }
}

const getTimeZoneListFailure = (error) => {
  return {
    type: actionTypes.GET_TIMEZONE_FAILURE,
    payload: error,
  }
}
export const getTimeZoneList = () =>
  async(dispatch) => {
    dispatch(getTimeZoneListRequest())
    try {
      const responseData = await masterServices.getTimeZone()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getTimeZoneListSuccess(responseData))
      } else {
        dispatch(getTimeZoneListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getTimeZoneListFailure(error?.response?.data))
    }
  }

const getSettingListRequest = () => {
  return {
    type: actionTypes.GET_SETTING_LIST_REQUEST,
  }
}

const getSettingListSuccess = (countries) => {
  return {
    type: actionTypes.GET_SETTING_LIST_SUCCESS,
    payload: countries,
  }
}

const getSettingListFailure = (error) => {
  return {
    type: actionTypes.GET_SETTING_LIST_FAILURE,
    payload: error,
  }
}
export const getSettingList = () =>
  async(dispatch) => {
    dispatch(getSettingListRequest())
    try {
      const responseData = await masterServices.getSetting()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        setToken('setting', responseData?.payload)
        dispatch(getSettingListSuccess(responseData))
      } else {
        dispatch(getSettingListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getSettingListFailure(error?.response?.data))
    }
  }
