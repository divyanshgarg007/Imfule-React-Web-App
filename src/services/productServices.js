import apiInstance from '../config/api/axios'

export const categories = async(shopID, companyID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`categories?&shop_id=${shopID}&company-id=${companyID}`, config)
  return response
}


export const products = async(data, companyID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response =
  // eslint-disable-next-line max-len
  await apiInstance.get(`products?category_id=${data.selectedCategory}&sort=${data.selectedSorting}&order=${data.order}&per_page=${data.per_page}&page=${data.page}&shop_id=${data.shop_id}&company-id=${companyID}&title=${data.title}`, config)
  return response
}

export const productDetails = async(productID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`products/${productID}`, config)
  return response
}

export const importCategories = async(selectedStore) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`import/category/${selectedStore.id}?shop_type=${selectedStore?.shop_type?.slug}`, config)
  return response
}
export const importProducts = async(selectedStore) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`import/product/${selectedStore.id}?shop_type=${selectedStore?.shop_type?.slug}`, config)
  return response
}

export const importScript = async(shopType, shopId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`import/sync/${shopId}?shop_type=${shopType}`, config)
  return response
}
