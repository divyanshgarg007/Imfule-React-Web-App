import * as actionTypes from '../actions/actionsType'


const INITIAL_STATE = {
  getStore: {
    data: null,
    error: null,
    loading: false,
  },
  addStore: {
    data: null,
    error: null,
    loading: false,
  },
  addStoreResponse: {
    data: null,
    error: null,
    loading: false,
  },
  addStoreInstall: {
    data: null,
    error: null,
    loading: false,
  },
  deleteStore: {
    data: null,
    error: null,
    loading: false,
  },
  getSocialMedia: {
    data: null,
    error: null,
    loading: false,
  },
  addSocialMedia: {
    data: null,
    error: null,
    loading: false,
  },
  addSocialMediaResponse: {
    data: null,
    error: null,
    loading: false,
  },
  connectShopsSocialMedia: {
    data: null,
    error: null,
    loading: false,
  },
  deleteSocialMedia: {
    data: null,
    error: null,
    loading: false,
  },
  changeSocialMediaStatus: {
    data: null,
    error: null,
    loading: false,
  },
  connectedSocialMediaWithShops: {
    data: null,
    error: null,
    loading: false,
  },
  connectedPagesWithSocialMedia: {
    data: null,
    error: null,
    loading: false,
    isLoaded: false,
    index: null,
  },
  addPostOnSocialMedia: {
    data: null,
    error: null,
    loading: false,
  },
  getStepperData: {
    data: null,
    error: null,
    loading: false,
  },
  updateTimeZone: {
    data: null,
    error: null,
    loading: false,
  },
}

const userReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_STORE_LIST_REQUEST:
      return {
        ...state,
        getStore: {
          ...state.getStore,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_STORE_LIST_FAILURE:
      return {
        ...state,
        getStore: {
          ...state.getStore,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.GET_STORE_LIST_SUCCESS:
      return {
        ...state,
        getStore: {
          ...state.getStore,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionTypes.ADD_STORE_SHOPIFY_REQUEST:
      return {
        ...state,
        addStore: {
          ...state.addStore,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_FAILURE:
      return {
        ...state,
        addStore: {
          ...state.addStore,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_SUCCESS:
      return {
        ...state,
        addStore: {
          ...state.addStore,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_RESPONSE_REQUEST:
      return {
        ...state,
        addStoreResponse: {
          ...state.addStoreResponse,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_RESPONSE_FAILURE:
      return {
        ...state,
        addStoreResponse: {
          ...state.addStoreResponse,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_RESPONSE_SUCCESS:
      return {
        ...state,
        addStoreResponse: {
          ...state.addStoreResponse,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionTypes.ADD_STORE_SHOPIFY_INSTALL_REQUEST:
      return {
        ...state,
        addStoreInstall: {
          ...state.addStoreInstall,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_INSTALL_FAILURE:
      return {
        ...state,
        addStoreInstall: {
          ...state.addStoreInstall,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.ADD_STORE_SHOPIFY_INSTALL_SUCCESS:
      return {
        ...state,
        addStoreInstall: {
          ...state.addStoreInstall,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionTypes.DELETE_STORE_REQUEST:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.DELETE_STORE_FAILURE:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.DELETE_STORE_SUCCESS:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.CLEAN_UP_USER_STATE_REQUEST:
      return {
        ...state,
        deleteStore: {
          ...state.deleteStore,
          error: null,
          data: null,
        },
        addStore: {
          ...state.addStore,
          error: null,
          data: null,
        },
        connectShopsSocialMedia: {
          ...state.connectShopsSocialMedia,
          error: null,
          data: null,
        },
        changeSocialMediaStatus: {
          ...state.changeSocialMediaStatus,
          error: null,
          data: null,
        },
        deleteSocialMedia: {
          ...state.deleteSocialMedia,
          error: null,
          data: null,
        },
        addPostOnSocialMedia: {
          ...state.addPostOnSocialMedia,
          data: null,
          error: null,
        },
        updateTimeZone: {
          ...state.updateTimeZone,
          data: null,
          error: null,
        },
        connectedPagesWithSocialMedia: {
          ...state.connectedPagesWithSocialMedia,
          data: null,
          error: null,
        },
        addStoreResponse: {
          ...state.addStoreResponse,
          data: null,
          error: null,
        },
      }
      //Social Media
    case actionTypes.GET_SOCIAL_MEDIA_LIST_REQUEST:
      return {
        ...state,
        getSocialMedia: {
          ...state.getSocialMedia,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_SOCIAL_MEDIA_LIST_FAILURE:
      return {
        ...state,
        getSocialMedia: {
          ...state.getSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.GET_SOCIAL_MEDIA_LIST_SUCCESS:
      return {
        ...state,
        getSocialMedia: {
          ...state.getSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_REQUEST:
      return {
        ...state,
        addSocialMedia: {
          ...state.addSocialMedia,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_FAILURE:
      return {
        ...state,
        addSocialMedia: {
          ...state.addSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        addSocialMedia: {
          ...state.addSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_REQUEST:
      return {
        ...state,
        addSocialMediaResponse: {
          ...state.addSocialMediaResponse,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_FAILURE:
      return {
        ...state,
        addSocialMediaResponse: {
          ...state.addSocialMediaResponse,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.ADD_SOCIAL_MEDIA_RESPONSE_SUCCESS:
      return {
        ...state,
        addSocialMediaResponse: {
          ...state.addSocialMediaResponse,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_REQUEST:
      return {
        ...state,
        connectShopsSocialMedia: {
          ...state.connectShopsSocialMedia,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_FAILURE:
      return {
        ...state,
        connectShopsSocialMedia: {
          ...state.connectShopsSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.CONNECT_SHOPS_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        connectShopsSocialMedia: {
          ...state.connectShopsSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.DELETE_SOCIAL_MEDIA_REQUEST:
      return {
        ...state,
        deleteSocialMedia: {
          ...state.deleteSocialMedia,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.DELETE_SOCIAL_MEDIA_FAILURE:
      return {
        ...state,
        deleteSocialMedia: {
          ...state.deleteSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.DELETE_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        deleteSocialMedia: {
          ...state.deleteSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_REQUEST:
      return {
        ...state,
        changeSocialMediaStatus: {
          ...state.changeSocialMediaStatus,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_FAILURE:
      return {
        ...state,
        changeSocialMediaStatus: {
          ...state.changeSocialMediaStatus,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.CHANGE_SOCIAL_MEDIA_STATUS_SUCCESS:
      return {
        ...state,
        changeSocialMediaStatus: {
          ...state.changeSocialMediaStatus,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_REQUEST:
      return {
        ...state,
        connectedSocialMediaWithShops: {
          ...state.connectedSocialMediaWithShops,
          data: null,
          loading: true,
          error: null,
          isLoaded: false,
        },
      }
    case actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_FAILURE:
      return {
        ...state,
        connectedSocialMediaWithShops: {
          ...state.connectedSocialMediaWithShops,
          data: null,
          loading: false,
          error: action.payload,
          isLoaded: false,
        },
      }
    case actionTypes.CONNECTED_SOCIAL_MEDIA_WITH_SHOPS_SUCCESS:
      return {
        ...state,
        connectedSocialMediaWithShops: {
          ...state.connectedSocialMediaWithShops,
          data: action.payload,
          loading: false,
          error: null,
          isLoaded: true,
        },
      }

    case actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_REQUEST:
      return {
        ...state,
        connectedPagesWithSocialMedia: {
          ...state.connectedPagesWithSocialMedia,
          data: null,
          loading: true,
          error: null,
          isLoaded: false,
          index: null,
        },
      }
    case actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_FAILURE:
      return {
        ...state,
        connectedPagesWithSocialMedia: {
          ...state.connectedPagesWithSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
          isLoaded: false,
          index: null,
        },
      }
    case actionTypes.CONNECTED_PAGES_WITH_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        connectedPagesWithSocialMedia: {
          ...state.connectedPagesWithSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
          isLoaded: true,
          index: action.index,
        },
      }

    case actionTypes.POST_ON_SOCIAL_MEDIA_REQUEST:
      return {
        ...state,
        addPostOnSocialMedia: {
          ...state.addPostOnSocialMedia,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.POST_ON_SOCIAL_MEDIA_FAILURE:
      return {
        ...state,
        addPostOnSocialMedia: {
          ...state.addPostOnSocialMedia,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.POST_ON_SOCIAL_MEDIA_SUCCESS:
      return {
        ...state,
        addPostOnSocialMedia: {
          ...state.addPostOnSocialMedia,
          data: action.payload,
          loading: false,
          error: null,
        },
      }

    case actionTypes.GET_STEPPER_REQUEST:
      return {
        ...state,
        getStepperData: {
          ...state.getStepperData,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_STEPPER_FAILURE:
      return {
        ...state,
        getStepperData: {
          ...state.getStepperData,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.GET_STEPPER_SUCCESS:
      return {
        ...state,
        getStepperData: {
          ...state.getStepperData,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.UPDATE_TIMEZONE_REQUEST:
      return {
        ...state,
        updateTimeZone: {
          ...state.updateTimeZone,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.UPDATE_TIMEZONE_FAILURE:
      return {
        ...state,
        updateTimeZone: {
          ...state.updateTimeZone,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.UPDATE_TIMEZONE_SUCCESS:
      return {
        ...state,
        updateTimeZone: {
          ...state.updateTimeZone,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    default:
      return state
  }
}

export default userReducers
