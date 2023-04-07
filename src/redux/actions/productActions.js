import * as ProductServices from '../../services/productServices'
import * as actionTypes from './actionsType'

const getCategoriesRequest = () => {
  return {
    type: actionTypes.PRODUCT_CATEGORIES_REQUEST,
  }
}

const getCategoriesFailure = (error) => {
  return {
    type: actionTypes.PRODUCT_CATEGORIES_FAILURE,
    payload: error,
  }
}

const getCategoriesSuccess = (data) => {
  return {
    type: actionTypes.PRODUCT_CATEGORIES_SUCCESS,
    payload: data,
  }
}

export const getCategoriesAction = (shopID, companyID) =>
  async(dispatch) => {
    dispatch(getCategoriesRequest())
    try {
      const responseData = await ProductServices.categories(shopID, companyID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getCategoriesSuccess(responseData))
      } else {
        dispatch(getCategoriesFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getCategoriesFailure(error?.response?.data))
    }
  }

const productFilterAction = (order, categoriesNames) => {
  return {
    type: actionTypes.PRODUCT_FILTER,
    categories: categoriesNames,
    order: order,
  }
}
const getProductsRequest = () => {
  return {
    type: actionTypes.PRODUCT_LIST_REQUEST,
  }
}

const getProductsFailure = (error) => {
  return {
    type: actionTypes.PRODUCT_LIST_FAILURE,
    payload: error,
  }
}

const getProductsSuccess = (data) => {
  return {
    type: actionTypes.PRODUCT_LIST_SUCCESS,
    payload: data,
  }
}

export const getProductsAction = (data, companyID, categoriesNames) =>
  async(dispatch) => {
    dispatch(getProductsRequest())
    dispatch(productFilterAction(data.order, categoriesNames))
    try {
      const responseData = await ProductServices.products(data, companyID)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getProductsSuccess(responseData))
      } else {
        dispatch(getProductsFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getProductsFailure(error?.response?.data))
    }
  }

const getProductDetailsRequest = () => {
  return {
    type: actionTypes.PRODUCT_DETAILS_REQUEST,
  }
}

const getProductDetailsFailure = (error) => {
  return {
    type: actionTypes.PRODUCT_DETAILS_FAILURE,
    payload: error,
  }
}

const getProductDetailsSuccess = (data) => {
  return {
    type: actionTypes.PRODUCT_DETAILS_SUCCESS,
    payload: data,
  }
}

export const getProductDetailsAction = (data) =>
  async(dispatch) => {
    dispatch(getProductDetailsRequest())
    try {
      const responseData = await ProductServices.productDetails(data)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(getProductDetailsSuccess(responseData))
      } else {
        dispatch(getProductDetailsFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(getProductDetailsFailure(error?.response?.data))
    }
  }
const cleanUpStateProductDetailsRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_PRODUCT_DETAILS_REQUEST,
  }
}


export const cleanUpStateProductDetails = () =>
  async(dispatch) => {
    dispatch(cleanUpStateProductDetailsRequest())

  }
  /// Cleanup product list
const cleanUpStateProductListRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_PRODUCT_LIST_REQUEST,
  }
}


export const cleanUpStateProductList = () =>
  async(dispatch) => {
    dispatch(cleanUpStateProductListRequest())

  }
const importProductRequest = () => {
  return {
    type: actionTypes.IMPORT_PRODUCT_REQUEST,
  }
}

const importProductFailure = (error) => {
  return {
    type: actionTypes.IMPORT_PRODUCT_FAILURE,
    payload: error,
  }
}

const importProductSuccess = (data) => {
  return {
    type: actionTypes.IMPORT_PRODUCT_SUCCESS,
    payload: data,
  }
}

export const importProductAction = (selectedStore) =>
  async(dispatch) => {
    dispatch(importProductRequest())
    try {
      const responseData = await ProductServices.importProducts(selectedStore)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(importProductSuccess(responseData))
      } else {
        dispatch(importProductFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(importProductFailure(error?.response?.data))
    }
  }

const importCategoriesRequest = () => {
  return {
    type: actionTypes.IMPORT_CATEGORY_REQUEST,
  }
}

const importCategoriesFailure = (error) => {
  return {
    type: actionTypes.IMPORT_CATEGORY_FAILURE,
    payload: error,
  }
}

const importCategoriesSuccess = (data) => {
  return {
    type: actionTypes.IMPORT_CATEGORY_SUCCESS,
    payload: data,
  }
}

export const importCategoriesAction = (selectedStore) =>
  async(dispatch) => {
    dispatch(importCategoriesRequest())
    try {
      const responseData = await ProductServices.importCategories(selectedStore)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(importCategoriesSuccess(responseData))
      } else {
        dispatch(importCategoriesFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(importCategoriesFailure(error?.response?.data))
    }
  }

const importScriptRequest = () => {
  return {
    type: actionTypes.IMPORT_SCRIPT_REQUEST,
  }
}

const importScriptFailure = (error) => {
  return {
    type: actionTypes.IMPORT_SCRIPT_FAILURE,
    payload: error,
  }
}

const importScriptSuccess = (data) => {
  return {
    type: actionTypes.IMPORT_SCRIPT_SUCCESS,
    payload: data,
  }
}

export const importScriptAction = (shopType, shopId) =>
  async(dispatch) => {
    dispatch(importScriptRequest())
    try {
      const responseData = await ProductServices.importScript(shopType, shopId)
      if (responseData?.meta?.status?.toUpperCase() === 'SUCCESS') {
        dispatch(importScriptSuccess(responseData))
      } else {
        dispatch(importScriptFailure(responseData.errors))
      }
    } catch (error) {
      dispatch(importScriptFailure(error?.response?.data))
    }
  }

const cleanUpStateProductRequest = () => {
  return {
    type: actionTypes.CLEAN_UP_PRODUCT_STATE_REQUEST,
  }
}


export const cleanUpStateProduct = () =>
  async(dispatch) => {
    dispatch(cleanUpStateProductRequest())

  }


