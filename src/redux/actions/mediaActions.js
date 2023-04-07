import * as mediaServices from '../../services/mediaServices'
import * as actionTypes from './actionsType'

const getMediaListRequest = () => {
  return {
    type: actionTypes.MEDIA_LIST_REQUEST,
  }
}

const getMediaListSuccess = (data) => {
  return {
    type: actionTypes.MEDIA_LIST_SUCCESS,
    payload: data,
  }
}

const getMediaListFailure = (error) => {
  return {
    type: actionTypes.MEDIA_LIST_FAILURE,
    payload: error,
  }
}
export const getMediaListAction = (data) =>
  async(dispatch) => {
    dispatch(getMediaListRequest())
    try {
      const responseData = await mediaServices.getMediaList(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getMediaListSuccess(responseData))
      } else {
        dispatch(getMediaListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getMediaListFailure(error?.response?.data))
    }
  }

// const addMediaRequest = () => {
//   return {
//     type: actionTypes.ADD_MEDIA_REQUEST,
//   }
// }

const addMediaSuccess = (data) => {
  return {
    type: actionTypes.ADD_MEDIA_SUCCESS,
    payload: data,
  }
}

// const addMediaFailure = (error) => {
//   return {
//     type: actionTypes.ADD_MEDIA_FAILURE,
//     payload: error,
//   }
// }
export const addMediaAction = (data) =>
  async(dispatch) => {
    dispatch(addMediaSuccess(data))
    // dispatch(addMediaRequest())
    // try {
    //   const responseData = await mediaServices.addMedia()
    //   if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
    //     dispatch(addMediaSuccess(responseData))
    //   } else {
    //     dispatch(addMediaFailure(responseData.errors))
    //   }
    // } catch (error) {
    //   dispatch(addMediaFailure(error?.response?.data))
    // }
  }

const deleteMediaRequest = () => {
  return {
    type: actionTypes.DELETE_MEDIA_REQUEST,
  }
}

const deleteMediaSuccess = (countries) => {
  return {
    type: actionTypes.DELETE_MEDIA_SUCCESS,
    payload: countries,
  }
}

const deleteMediaFailure = (error) => {
  return {
    type: actionTypes.DELETE_MEDIA_FAILURE,
    payload: error,
  }
}
export const deleteMediaAction = (mediaId) =>
  async(dispatch) => {
    dispatch(deleteMediaRequest())
    try {
      const responseData = await mediaServices.deleteMedia(mediaId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(deleteMediaSuccess(responseData))
      } else {
        dispatch(deleteMediaFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(deleteMediaFailure(error?.response?.data))
    }
  }

/////Cleanup media list and delete list
const cleanUpMediaRequest = () => {
  return {
    type: actionTypes.CLEANUP_MEDIA_DATA,
  }
}
export const cleanUpMediaState = () =>
  async(dispatch) => {
    dispatch(cleanUpMediaRequest())

  }
