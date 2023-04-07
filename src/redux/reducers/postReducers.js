/* eslint-disable no-case-declarations */
import * as actionsType from '../actions/actionsType'


const INITIAL_STATE = {
  addPostData: [{
    currentNetwork: null,
    page_id: null,
    page_name: '',
    description: '',
    scheduled_at: null,
    post_type: null,
    image: [],
    type: '',
    pagesData: [],
    title: '',
    limitDesc: 0,
    limitTitle: 0,
    imageLimit: 0,
  }],
  getPosition: 0,
  getPostedList: {
    data: [],
    error: null,
    loading: false,
  },
  getArchiveList: {
    data: [],
    error: null,
    loading: false,
  },
  getCalendarPostedList: {
    data: null,
    error: null,
    loading: false,
  },
  deletePostedList: {
    data: null,
    error: null,
    loading: false,
  },
  deletePostedItem: {
    data: null,
    error: null,
    loading: false,
  },
  getSpecificPostedData: {
    data: null,
    error: null,
    loading: false,
  },
  updatePostedData: {
    data: null,
    error: null,
    loading: false,
  },
  getSpecificAchiveData: {
    data: null,
    error: null,
    loading: false,
  },
}

const addPostReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsType.ADD_POST_DATA:
      return {
        ...state,
        addPostData: [].concat(state.addPostData, action.payload),
      }
    case actionsType.UPDATE_POST_DATA:
      return {
        ...state,
        addPostData: action.payload,
      }
    case actionsType.REMOVE_DATA:
      return {
        ...state,
        addPostData: action.payload,
      }
    case actionsType.CHANGE_DATA:
      return {
        ...state,
        addPostData: action.payload,
      }
    case actionsType.CLEANUP_ADD_POST_DATA:
      return {
        ...state,
        addPostData: [{
          currentNetwork: null,
          page_id: null,
          description: '',
          scheduled_at: null,
          post_type: null,
          image: [],
          type: '',
          pagesData: [],
          title: '',
          limitDesc: 0,
          limitTitle: 0,
          imageLimit: 0,
        }],
        deletePostedList: {
          ...state.deletePostedList,
          data: null,
          error: null,
        },
        deletePostedItem: {
          ...state.deletePostedItem,
          data: null,
          error: null,
        },
        getSpecificPostedData: {
          ...state.getSpecificPostedData,
          data: null,
          error: null,
        },
        updatePostedData: {
          ...state.updatePostedData,
          data: null,
          error: null,
        },
        getSpecificAchiveData: {
          ...state.getSpecificAchiveData,
          data: null,
          error: null,
        },
      }
    case actionsType.CLEANUP_POSTED_LIST_DATA:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          pagination: null,
          data: [],
          error: null,
        },
        getArchiveList: {
          ...state.getArchiveList,
          pagination: null,
          data: [],
          error: null,
        },
        // getCalendarPostedList: {
        //   ...state.getCalendarPostedList,
        //   data: null,
        //   error: null,
        // },
      }
    case actionsType.GET_POST_DATA_INDEX_DATA:
      return {
        ...state,
        getPosition: action.payload,
      }
    case actionsType.FILTERED_POSTED_LIST_SUCCESS:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          data: state.getPostedList.data.filter((data) => data.id !== action.payload),
          loading: false,
          error: null,
          pagination: state?.getPostedList?.pagination,
        },
      }
    case actionsType.FILTERED_POSTED_ITEM_SUCCESS:
      const dataRow = state.getPostedList.data.find((row) => row.id === action.payload.parentId)
      const newDataRow = dataRow.post_item.filter((ptItem) => ptItem.id !== action.payload.data)
      const updatedData = state.getPostedList.data.map((x) => (x.id === action.payload.parentId) ? {...x, post_item: newDataRow} : x)
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          data: [
            ...updatedData,
          ],
          loading: false,
          error: null,
          pagination: state?.getPostedList?.pagination,
        },
      }
    case actionsType.GET_POSTED_LIST_DATA_REQUEST:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_POSTED_LIST_DATA_FAILURE:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          pagination: null,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_POSTED_LIST_DATA_SUCCESS:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          pagination: action.payload,
          data: action.payload.payload.data,
          loading: false,
          error: null,
        },
      }
    case actionsType.GET_POSTED_LIST_LOAD_MORE_DATA_REQUEST:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_POSTED_LIST_LOAD_MORE_DATA_FAILURE:
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          pagination: null,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_POSTED_LIST_LOAD_MORE_DATA_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const {data: newData} = action.payload.payload
      return {
        ...state,
        getPostedList: {
          ...state.getPostedList,
          pagination: action.payload,
          data: [...state.getPostedList.data, ...newData],
          loading: false,
          error: null,
        },
      }
    case actionsType.GET_CALENDAR_POSTED_LIST_DATA_REQUEST:
      return {
        ...state,
        getCalendarPostedList: {
          ...state.getCalendarPostedList,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_CALENDAR_POSTED_LIST_DATA_FAILURE:
      return {
        ...state,
        getCalendarPostedList: {
          ...state.getCalendarPostedList,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_CALENDAR_POSTED_LIST_DATA_SUCCESS:
      return {
        ...state,
        getCalendarPostedList: {
          ...state.getCalendarPostedList,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_DATA_REQUEST:
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_DATA_FAILURE:
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          pagination: null,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_DATA_SUCCESS:
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          pagination: action.payload,
          data: action.payload.payload.data,
          loading: false,
          error: null,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_LOAD_MORE_DATA_REQUEST:
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_LOAD_MORE_DATA_FAILURE:
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          pagination: null,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_ARCHIVE_LIST_LOAD_MORE_DATA_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const {data: newArchiveData} = action.payload.payload
      return {
        ...state,
        getArchiveList: {
          ...state.getArchiveList,
          pagination: action.payload,
          data: [...state.getArchiveList.data, ...newArchiveData],
          loading: false,
          error: null,
        },
      }
    case actionsType.DELETE_POSTED_LIST_REQUEST:
      return {
        ...state,
        deletePostedList: {
          ...state.deletePostedList,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.DELETE_POSTED_LIST_FAILURE:
      return {
        ...state,
        deletePostedList: {
          ...state.deletePostedList,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.DELETE_POSTED_LIST_SUCCESS:
      return {
        ...state,
        deletePostedList: {
          ...state.deletePostedList,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionsType.DELETE_POSTED_ITEM_REQUEST:
      return {
        ...state,
        deletePostedItem: {
          ...state.deletePostedItem,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.DELETE_POSTED_ITEM_FAILURE:
      return {
        ...state,
        deletePostedItem: {
          ...state.deletePostedItem,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.DELETE_POSTED_ITEM_SUCCESS:
      return {
        ...state,
        deletePostedItem: {
          ...state.deletePostedItem,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionsType.GET_SPECIFIC_POSTED_DATA_REQUEST:
      return {
        ...state,
        getSpecificPostedData: {
          ...state.getSpecificPostedData,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_SPECIFIC_POSTED_DATA_FAILURE:
      return {
        ...state,
        getSpecificPostedData: {
          ...state.getSpecificPostedData,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_SPECIFIC_POSTED_DATA_SUCCESS:
      return {
        ...state,
        getSpecificPostedData: {
          ...state.getSpecificPostedData,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionsType.GET_SPECIFIC_ARCHIVE_DATA_REQUEST:
      return {
        ...state,
        getSpecificAchiveData: {
          ...state.getSpecificAchiveData,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_SPECIFIC_ARCHIVE_DATA_FAILURE:
      return {
        ...state,
        getSpecificAchiveData: {
          ...state.getSpecificAchiveData,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_SPECIFIC_ARCHIVE_DATA_SUCCESS:
      return {
        ...state,
        getSpecificAchiveData: {
          ...state.getSpecificAchiveData,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.UPDATE_POST_DATA_REQUEST:
      return {
        ...state,
        updatePostedData: {
          ...state.updatePostedData,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.UPDATE_POST_DATA_FAILURE:
      return {
        ...state,
        updatePostedData: {
          ...state.updatePostedData,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.UPDATE_POST_DATA_SUCCESS:
      return {
        ...state,
        updatePostedData: {
          ...state.updatePostedData,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    default:
      return state
  }
}

export default addPostReducers
