import * as actionsType from '../actions/actionsType'
const INITIAL_STATE = {
  getMediaList: {
    data: null,
    loading: false,
    error: null,
  },
  addMedia: {
    data: null,
    loading: false,
    error: null,
  },
  deleteMedia: {
    data: null,
    loading: false,
    error: null,
  },
}

const mediaReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsType.MEDIA_LIST_REQUEST:
      return {
        ...state,
        getMediaList: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.MEDIA_LIST_SUCCESS:
      return {
        ...state,
        getMediaList: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.MEDIA_LIST_FAILURE:
      return {
        ...state,
        getMediaList: {
          ...state.getMediaList,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    // case actionsType.ADD_MEDIA_REQUEST:
    //   return {
    //     ...state,
    //     addMedia: {
    //       data: null,
    //       loading: true,
    //       error: null,
    //     },
    //   }
    case actionsType.ADD_MEDIA_SUCCESS:
      return {
        // ...state,
        // addMedia: {
        //   data: action.payload,
        //   loading: false,
        //   error: null,
        ...state,
        getMediaList: [].concat(action.payload, state.getMediaList.data.payload),
      }
    // case actionsType.ADD_MEDIA_FAILURE:
    //   return {
    //     ...state,
    //     deleteMedia: {
    //       ...state.deleteMedia,
    //       data: null,
    //       loading: false,
    //       error: action.payload,
    //     },
    //   }
    case actionsType.DELETE_MEDIA_REQUEST:
      return {
        ...state,
        deleteMedia: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.DELETE_MEDIA_SUCCESS:
      return {
        ...state,
        deleteMedia: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.DELETE_MEDIA_FAILURE:
      return {
        ...state,
        deleteMedia: {
          ...state.deleteMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.CLEANUP_MEDIA_DATA:
      return {
        ...state,
        deleteMedia: {
          ...state.deleteMedia,
          data: null,
          error: null,
        },
        getMediaList: {
          ...state.getMediaList,
          data: null,
          error: null,
        },
      }
    default:
      return state
  }
}

export default mediaReducers

