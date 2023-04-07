import * as actionsType from '../actions/actionsType'


const INITIAL_STATE = {
  addPromotionData: [{
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
  }],
  getPromotionPosition: 0,
}
const addPromotionReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsType.ADD_PROMOTION_DATA:
      return {
        ...state,
        addPromotionData: [].concat(state.addPromotionData, action.payload),
      }
    case actionsType.UPDATE_PROMOTION_DATA:
      return {
        ...state,
        addPromotionData: action.payload,
      }
    case actionsType.REMOVE_PROMOTION_DATA:
      return {
        ...state,
        addPromotionData: action.payload,
      }
    case actionsType.CHANGE_PROMOTION_DATA:
      return {
        ...state,
        addPromotionData: action.payload,
      }
    case actionsType.CLEANUP_ADD_PROMOTION_DATA:
      return {
        ...state,
        addPromotionData: [{
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
        }],
      }
    case actionsType.GET_PROMOTION_DATA_INDEX_DATA:
      return {
        ...state,
        getPromotionPosition: action.payload,
      }
    default:
      return state
  }
}

export default addPromotionReducers
