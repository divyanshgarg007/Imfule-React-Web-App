import * as postServices from '../../services/postServices'
import * as actionTypes from './actionsType'

const addPostDataSuccess = (data) => {
  return {
    type: actionTypes.ADD_POST_DATA,
    payload: data,
  }
}

export const addPostDataAction = (data) =>
  async(dispatch) => {
    dispatch(addPostDataSuccess(data))
  }
const updatePostDataSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_POST_DATA,
    payload: data,
  }
}

export const updatePostDataAction = (data) =>
  async(dispatch) => {
    dispatch(updatePostDataSuccess(data))
  }
const onChangeSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_DATA,
    payload: data,
  }
}

export const onChangeSocialMediaAction = (data) =>
  async(dispatch) => {
    dispatch(onChangeSocialMediaSuccess(data))
  }

const removeSocialMediaSuccess = (data) => {
  return {
    type: actionTypes.CHANGE_DATA,
    payload: data,
  }
}

export const removeSocialMediaAction = (data) =>
  async(dispatch) => {
    dispatch(removeSocialMediaSuccess(data))
  }

const getPostDataIndexSuccess = (data) => {
  return {
    type: actionTypes.GET_POST_DATA_INDEX_DATA,
    payload: data,
  }
}

export const getPostDataIndexAction = (data) =>
  async(dispatch) => {
    dispatch(getPostDataIndexSuccess(data))
  }

const cleanUpSocialMediaPostRequest = () => {
  return {
    type: actionTypes.CLEANUP_ADD_POST_DATA,
  }
}
export const cleanUpSocialMediaPostState = () =>
  async(dispatch) => {
    dispatch(cleanUpSocialMediaPostRequest())

  }
/////Cleanup schedule and archive list
const cleanUpPostedRequest = () => {
  return {
    type: actionTypes.CLEANUP_POSTED_LIST_DATA,
  }
}
export const cleanUpPostedState = () =>
  async(dispatch) => {
    dispatch(cleanUpPostedRequest())

  }
/////Schedule list
const getPostedListRequest = () => {
  return {
    type: actionTypes.GET_POSTED_LIST_DATA_REQUEST,
  }
}

const getPostedListFailure = (error) => {
  return {
    type: actionTypes.GET_POSTED_LIST_DATA_FAILURE,
    payload: error,
  }
}

const getPostedListSuccess = (data) => {
  return {
    type: actionTypes.GET_POSTED_LIST_DATA_SUCCESS,
    payload: data,
  }
}

export const getPostedListAction = (data) =>
  async(dispatch) => {
    dispatch(getPostedListRequest())
    try {
      const responseData = await postServices.getPostedList(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getPostedListSuccess(responseData))
      } else {
        dispatch(getPostedListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getPostedListFailure(error?.response?.data))
    }
  }
  ///// Load more posted list
const getPostedListLoadMoreRequest = () => {
  return {
    type: actionTypes.GET_POSTED_LIST_LOAD_MORE_DATA_REQUEST,
  }
}

const getPostedListLoadMoreFailure = (error) => {
  return {
    type: actionTypes.GET_POSTED_LIST_LOAD_MORE_DATA_FAILURE,
    payload: error,
  }
}

const getPostedListLoadMoreSuccess = (data) => {
  return {
    type: actionTypes.GET_POSTED_LIST_LOAD_MORE_DATA_SUCCESS,
    payload: data,
  }
}

export const getPostedListLoadMoreAction = (data) =>
  async(dispatch) => {
    dispatch(getPostedListLoadMoreRequest())
    try {
      const responseData = await postServices.getPostedList(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getPostedListLoadMoreSuccess(responseData))
      } else {
        dispatch(getPostedListLoadMoreFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getPostedListLoadMoreFailure(error?.response?.data))
    }
  }
/////Calendar posted list
const getCalendarPostedListRequest = () => {
  return {
    type: actionTypes.GET_CALENDAR_POSTED_LIST_DATA_REQUEST,
  }
}

const getCalendarPostedListFailure = (error) => {
  return {
    type: actionTypes.GET_CALENDAR_POSTED_LIST_DATA_FAILURE,
    payload: error,
  }
}

const getCalendarPostedListSuccess = (data) => {
  return {
    type: actionTypes.GET_CALENDAR_POSTED_LIST_DATA_SUCCESS,
    payload: data,
  }
}

export const getCalendarPostedListAction = (start, end) =>
  async(dispatch) => {
    dispatch(getCalendarPostedListRequest())
    try {
      const responseData = await postServices.getCalendarPostedList(start, end)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getCalendarPostedListSuccess(responseData))
      } else {
        dispatch(getCalendarPostedListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getCalendarPostedListFailure(error?.response?.data))
    }
  }
// Filtered Posted List
const filteredPostedList = (data) => {
  return {
    type: actionTypes.FILTERED_POSTED_LIST_SUCCESS,
    payload: data,
  }
}
//Filtered Posted Item List
const filteredPostedItemList = (data, parentId) => {
  return {
    type: actionTypes.FILTERED_POSTED_ITEM_SUCCESS,
    payload: {data, parentId},
  }
}
/////Delete post

const deletePostedListRequest = () => {
  return {
    type: actionTypes.DELETE_POSTED_LIST_REQUEST,
  }
}

const deletePostedListFailure = (error) => {
  return {
    type: actionTypes.DELETE_POSTED_LIST_FAILURE,
    payload: error,
  }
}

const deletePostedListSuccess = (data) => {
  return {
    type: actionTypes.DELETE_POSTED_LIST_SUCCESS,
    payload: data,
  }
}

export const deletePostedListAction = (postId) =>
  async(dispatch) => {
    dispatch(deletePostedListRequest())
    try {
      const responseData = await postServices.deletePostedList(postId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(deletePostedListSuccess(responseData))
        dispatch(filteredPostedList(postId))
      } else {
        dispatch(deletePostedListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(deletePostedListFailure(error?.response?.data))
    }
  }

///delete post item

const deletePostedItemRequest = () => {
  return {
    type: actionTypes.DELETE_POSTED_ITEM_REQUEST,
  }
}

const deletePostedItemFailure = (error) => {
  return {
    type: actionTypes.DELETE_POSTED_ITEM_FAILURE,
    payload: error,
  }
}

const deletePostedItemSuccess = (data, parentPostId) => {
  return {
    type: actionTypes.DELETE_POSTED_ITEM_SUCCESS,
    payload: data,
    parentId: parentPostId,
  }
}

export const deletePostedItemAction = (postItemId, parentPostId) =>
  async(dispatch) => {
    dispatch(deletePostedItemRequest())
    try {
      const responseData = await postServices.deletePostedItem(postItemId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(deletePostedItemSuccess(responseData))
        dispatch(filteredPostedItemList(postItemId, parentPostId))
        //dispatch(getPostedListAction())
      } else {
        dispatch(deletePostedItemFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(deletePostedItemFailure(error?.response?.data))
    }
  }

///get specific posted data
const getSpecificPostedDataRequest = () => {
  return {
    type: actionTypes.GET_SPECIFIC_POSTED_DATA_REQUEST,
  }
}

const getSpecificPostedDataFailure = (error) => {
  return {
    type: actionTypes.GET_SPECIFIC_POSTED_DATA_FAILURE,
    payload: error,
  }
}

const getSpecificPostedDataSuccess = (data) => {
  return {
    type: actionTypes.GET_SPECIFIC_POSTED_DATA_SUCCESS,
    payload: data,
  }
}

export const getSpecificPostedDataAction = (postId) =>
  async(dispatch) => {
    dispatch(getSpecificPostedDataRequest())
    try {
      const responseData = await postServices.getSpecificPostedData(postId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getSpecificPostedDataSuccess(responseData))
      } else {
        dispatch(getSpecificPostedDataFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getSpecificPostedDataFailure(error?.response?.data))
    }
  }

///update posted data
const updatePostedDataRequest = () => {
  return {
    type: actionTypes.UPDATE_POST_DATA_REQUEST,
  }
}

const updatePostedDataFailure = (error) => {
  return {
    type: actionTypes.UPDATE_POST_DATA_FAILURE,
    payload: error,
  }
}

const updatePostedDataSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_POST_DATA_SUCCESS,
    payload: data,
  }
}

export const updatePostedDataAction = (postId, data) =>
  async(dispatch) => {
    dispatch(updatePostedDataRequest())
    try {
      const responseData = await postServices.updatePostedData(postId, data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(updatePostedDataSuccess(responseData))
        //dispatch(getPostedListAction())
        dispatch(cleanUpPostedState())

      } else {
        dispatch(updatePostedDataFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(updatePostedDataFailure(error?.response?.data))
    }
  }

///Archieve list

const archiveListRequest = () => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_DATA_REQUEST,
  }
}

const archiveListFailure = (error) => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_DATA_FAILURE,
    payload: error,
  }
}

const archiveListSuccess = (data) => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_DATA_SUCCESS,
    payload: data,
  }
}

export const archiveListAction = (data) =>
  async(dispatch) => {
    dispatch(archiveListRequest())
    try {
      const responseData = await postServices.archiveList(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(archiveListSuccess(responseData))
      } else {
        dispatch(archiveListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(archiveListFailure(error?.response?.data))
    }
  }

//Archive list load more
const archiveListLoadMoreRequest = () => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_LOAD_MORE_DATA_REQUEST,
  }
}

const archiveListLoadMoreFailure = (error) => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_LOAD_MORE_DATA_FAILURE,
    payload: error,
  }
}

const archiveListLoadMoreSuccess = (data) => {
  return {
    type: actionTypes.GET_ARCHIVE_LIST_LOAD_MORE_DATA_SUCCESS,
    payload: data,
  }
}

export const archiveListLoadMoreAction = (data) =>
  async(dispatch) => {
    dispatch(archiveListLoadMoreRequest())
    try {
      const responseData = await postServices.archiveList(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(archiveListLoadMoreSuccess(responseData))
      } else {
        dispatch(archiveListLoadMoreFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(archiveListLoadMoreFailure(error?.response?.data))
    }
  }
///get archive list
const getSpecificArchiveListRequest = () => {
  return {
    type: actionTypes.GET_SPECIFIC_ARCHIVE_DATA_REQUEST,
  }
}

const getSpecificArchiveListFailure = (error) => {
  return {
    type: actionTypes.GET_SPECIFIC_ARCHIVE_DATA_FAILURE,
    payload: error,
  }
}

const getSpecificArchiveListSuccess = (data) => {
  return {
    type: actionTypes.GET_SPECIFIC_ARCHIVE_DATA_SUCCESS,
    payload: data,
  }
}
export const getSpecificArchiveListAction = (postId) =>
  async(dispatch) => {
    dispatch(getSpecificArchiveListRequest())
    try {
      const responseData = await postServices.getSpecificArchiveData(postId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getSpecificArchiveListSuccess(responseData))
      } else {
        dispatch(getSpecificArchiveListFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getSpecificArchiveListFailure(error?.response?.data))
    }
  }

