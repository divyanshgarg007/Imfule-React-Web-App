import * as CompanyServices from '../../services/companyServices'
import * as actionTypes from './actionsType'

const getCompanyRequest = () => {
  return {
    type: actionTypes.GET_COMPANY_REQUEST,
  }
}

const getCompanyFailure = (error) => {
  return {
    type: actionTypes.GET_COMPANY_FAILURE,
    payload: error,
  }
}

const getCompanySuccess = (data) => {
  return {
    type: actionTypes.GET_COMPANY_SUCCESS,
    payload: data,
  }
}

export const getCompanyAction = (companyID) =>
  async(dispatch) => {
    dispatch(getCompanyRequest())
    try {
      const responseData = await CompanyServices.companies(companyID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getCompanySuccess(responseData))
      } else {
        dispatch(getCompanyFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getCompanyFailure(error?.response?.data))
    }
  }

const updateCompanyRequest = () => {
  return {
    type: actionTypes.UPDATE_COMPANY_REQUEST,
  }
}

const updateCompanyFailure = (error) => {
  return {
    type: actionTypes.UPDATE_COMPANY_FAILURE,
    payload: error,
  }
}

const updateCompanySuccess = (data) => {
  return {
    type: actionTypes.UPDATE_COMPANY_SUCCESS,
    payload: data,
  }
}

export const updateCompanyAction = (companyID, data) =>
  async(dispatch) => {
    dispatch(updateCompanyRequest())
    try {
      const responseData = await CompanyServices.updateCompany(companyID, data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(updateCompanySuccess(responseData))
        dispatch(getCompanySuccess(responseData))
      } else {
        dispatch(updateCompanyFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(updateCompanyFailure(error?.response?.data))
    }
  }
const cleanUpCompanyStateRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_COMPANY_STATE_REQUEST,
  }
}


export const cleanUpCompanyState = () =>
  async(dispatch) => {
    dispatch(cleanUpCompanyStateRequest())

  }
