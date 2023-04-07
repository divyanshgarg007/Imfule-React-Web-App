import * as actionTypes from './actionsType'

const addPromotionDataSuccess = (data) => {
  return {
    type: actionTypes.ADD_PROMOTION_DATA,
    payload: data,
  }
}

export const addPromotionDataAction = (data) =>
  async(dispatch) => {
    dispatch(addPromotionDataSuccess(data))
  }
const updatePromotionDataSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_PROMOTION_DATA,
    payload: data,
  }
}

export const updatePromotionDataAction = (data) =>
  async(dispatch) => {
    dispatch(updatePromotionDataSuccess(data))
  }
const onChangeSocialMediaPromotionSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_PROMOTION_DATA,
    payload: data,
  }
}

export const onChangeSocialMediaPromotionAction = (data) =>
  async(dispatch) => {
    dispatch(onChangeSocialMediaPromotionSuccess(data))
  }

const removeSocialMediaPromotionSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_PROMOTION_DATA,
    payload: data,
  }
}

export const removeSocialMediaPromotionAction = (data) =>
  async(dispatch) => {
    dispatch(removeSocialMediaPromotionSuccess(data))
  }

const getPromotionDataIndexSuccess = (data) => {
  return {
    type: actionTypes.GET_PROMOTION_DATA_INDEX_DATA,
    payload: data,
  }
}

export const getPromotionDataIndexAction = (data) =>
  async(dispatch) => {
    dispatch(getPromotionDataIndexSuccess(data))
  }

const cleanUpSocialMediaPromotionRequest = () => {
  return {
    type: actionTypes.CLEANUP_ADD_PROMOTION_DATA,
  }
}
export const cleanUpSocialMediaPromotionState = () =>
  async(dispatch) => {
    dispatch(cleanUpSocialMediaPromotionRequest())

  }
