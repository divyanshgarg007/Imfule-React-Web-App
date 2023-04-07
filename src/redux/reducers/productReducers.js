import * as actionsType from '../actions/actionsType'


const INITIAL_STATE = {
  products: {
    data: null,
    error: null,
    loading: false,
  },
  categories: {
    data: null,
    error: null,
    loading: false,
  },
  productDetails: {
    data: null,
    error: null,
    loading: false,
  },
  importProduct: {
    data: null,
    error: null,
    loading: false,
  },
  importCategories: {
    data: null,
    error: null,
    loading: false,
  },
  importScript: {
    data: null,
    error: null,
    loading: false,
  },
  filter: {
    categories: [],
    sorting: '',
  },
}

const productReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsType.PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: {
          ...state.categories,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: {
          ...state.categories,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          data: null,
          loading: true,
          isLoaded: false,
          error: null,
        },
      }
    case actionsType.PRODUCT_LIST_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          data: null,
          loading: false,
          isLoaded: false,
          error: action.payload,
        },
      }
    case actionsType.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          data: action.payload,
          loading: false,
          isLoaded: true,
          error: null,
        },
      }
    case actionsType.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.CLEAN_UP_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          data: null,
          error: null,
        },
      }
    case actionsType.CLEAN_UP_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          data: null,
          error: null,
          loading: false,
          isLoaded: false,
        },
      }
    case actionsType.IMPORT_PRODUCT_REQUEST:
      return {
        ...state,
        importProduct: {
          ...state.importProduct,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.IMPORT_PRODUCT_FAILURE:
      return {
        ...state,
        importProduct: {
          ...state.importProduct,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.IMPORT_PRODUCT_SUCCESS:
      return {
        ...state,
        importProduct: {
          ...state.importProduct,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.IMPORT_CATEGORY_REQUEST:
      return {
        ...state,
        importCategories: {
          ...state.importCategories,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.IMPORT_CATEGORY_FAILURE:
      return {
        ...state,
        importCategories: {
          ...state.importCategories,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.IMPORT_CATEGORY_SUCCESS:
      return {
        ...state,
        importCategories: {
          ...state.importCategories,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    case actionsType.CLEAN_UP_PRODUCT_STATE_REQUEST:
      return {
        ...state,
        importProduct: {
          ...state.importProduct,
          error: null,
          data: null,
        },
        importCategories: {
          ...state.importCategories,
          error: null,
          data: null,
        },
      }
    case actionsType.PRODUCT_FILTER:
      return {
        ...state,
        filter: {
          categories: action.categories,
          order: action.order,
        },
      }
    case actionsType.IMPORT_SCRIPT_REQUEST:
      return {
        ...state,
        importScript: {
          ...state.importScript,
          data: null,
          loading: true,
          error: null,
        },
      }
    case actionsType.IMPORT_SCRIPT_FAILURE:
      return {
        ...state,
        importScript: {
          ...state.importScript,
          data: null,
          loading: false,
          error: action.payload,
        },
      }
    case actionsType.IMPORT_SCRIPT_SUCCESS:
      return {
        ...state,
        importScript: {
          ...state.importScript,
          data: action.payload,
          loading: false,
          error: null,
        },
      }
    default:
      return state
  }
}

export default productReducers
