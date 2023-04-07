import * as actionTypes from '../actions/actionsType'
const INITIAL_STATE = {
  countries: {
    data: null,
    loading: false,
    error: null,
  },
  timeZoneList: {
    data: null,
    loading: false,
    error: null,
  },
  settingList: {
    data: null,
    loading: false,
    error: null,
  },
}

const masterReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY_REQUEST:
      return {
        ...state,
        countries: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.GET_COUNTRY_FAILURE:
      return {
        ...state,
        countries: {
          ...state.countries,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.GET_TIMEZONE_REQUEST:
      return {
        ...state,
        timeZoneList: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_TIMEZONE_SUCCESS:
      return {
        ...state,
        timeZoneList: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.GET_TIMEZONE_FAILURE:
      return {
        ...state,
        timeZoneList: {
          ...state.timeZoneList,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionTypes.GET_SETTING_LIST_REQUEST:
      return {
        ...state,
        settingList: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_SETTING_LIST_SUCCESS:
      return {
        ...state,
        settingList: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.GET_SETTING_LIST_FAILURE:
      return {
        ...state,
        settingList: {
          ...state.settingList,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default masterReducers

