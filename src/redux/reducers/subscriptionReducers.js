import * as actionTypes from '../actions/actionsType'
const INITIAL_STATE = {
  subscriptionList: {
    data: null,
    loading: false,
    error: null,
  },
}

const subscriptionReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        subscriptionList: {
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionTypes.GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionList: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionTypes.GET_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscriptionList: {
          ...state.countries,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}

export default subscriptionReducers

