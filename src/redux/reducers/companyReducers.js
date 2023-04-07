import * as actionsType from '../actions/actionsType'


const INITIAL_STATE = {
  companies: {
    data: null,
    error: null,
    loading: false,
  },
  updateCompany: {
    data: null,
    error: null,
    loading: false,
  },
}

const companyReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsType.GET_COMPANY_REQUEST:
      return {
        ...state,
        companies: {
          ...state.companies,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.GET_COMPANY_FAILURE:
      return {
        ...state,
        companies: {
          ...state.companies,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.GET_COMPANY_SUCCESS:
      return {
        ...state,
        companies: {
          ...state.companies,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        updateCompany: {
          ...state.updateCompany,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        updateCompany: {
          ...state.updateCompany,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        updateCompany: {
          ...state.updateCompany,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.CLEAN_UP_COMPANY_STATE_REQUEST:
      return {
        ...state,
        updateCompany: {
          ...state.updateCompany,
          error: null,
          data: null,
        },
      }
    default:
      return state
  }
}

export default companyReducers
