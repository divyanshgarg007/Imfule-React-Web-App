import * as masterServices from '../../services/subscriptionServices'
import * as actionTypes from './actionsType'

const getSubscriptionListRequest = () => {
  return {
    type: actionTypes.GET_SUBSCRIPTION_REQUEST,
  }
}

const getSubscriptionListSuccess = (countries) => {
  return {
    type: actionTypes.GET_SUBSCRIPTION_SUCCESS,
    payload: countries,
  }
}

const getSubscriptionListFailure = (error) => {
  return {
    type: actionTypes.GET_SUBSCRIPTION_FAILURE,
    payload: error,
  }
}
export const getSubscriptionList = () =>
  async(dispatch) => {
    dispatch(getSubscriptionListRequest())
    try {
      const responseData = await masterServices.getSubscription()
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getSubscriptionListSuccess(responseData))
      } else {
        dispatch(getSubscriptionListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getSubscriptionListFailure(error?.response?.data))
    }
  }
