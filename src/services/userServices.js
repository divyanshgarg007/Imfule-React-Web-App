import apiInstance from '../config/api/axios'

export const getStore = async() => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get('shops', config)
  return response
}

export const addStore = async(shopType, data) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.post(`add-shop/${shopType}`, data, config)
  return response
}


export const addStoreResponse = async(code, hmac, host, shop, timestamp) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  let data = {
    code: code,
    hmac: hmac,
    host: host,
    shop: shop,
    timestamp: timestamp,
  }
  const response = await apiInstance.post('add-shop-response/shopify', data, config)
  return response
}

export const addStoreInstall = async(hmac, host, shop, timestamp, shopType) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  let data = {
    hmac: hmac,
    host: host,
    shop: shop,
    timestamp: timestamp,
  }
  const response = await apiInstance.post(`install/${shopType}`, data, config)
  return response
}

export const deleteStore = async(shopID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.delete(`shops/${shopID}`, config)
  return response
}
//Social Media
export const getSocialMediaList = async() => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get('social-media', config)
  return response
}

export const addSocialMedia = async(media) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get(`social-media/connect/${media}`, config)
  return response
}


export const addSocialMediaResponse = async(code, media) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  let data
  if (media === 'twitter') {
    data = code
  } else {
    data = {
      code: code,
    }
  }
  const response = await apiInstance.post(`social-media/connect/callback/${media}`, data, config)
  return response
}

export const connectShopsToSocialMedia = async(data) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.post('shop/social-media', data, config)
  return response
}

export const deleteSocialMedia = async(socialMediaId) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.delete(`social-media/${socialMediaId}`, config)
  return response
}

export const changeSocialMediaStatus = async(socialMediaId, status) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    status: status,
  }
  const response = await apiInstance.put(`social-media/${socialMediaId}`, data, config)
  return response
}

export const connectedSocialMediaWithShops = async() => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get('shop/social-media', config)
  return response
}

export const getConnectedPagesWithSocialMedia = async(socialMediaID) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get(`shop/social-media/pages?s_id=${socialMediaID}`, config)
  return response
}

export const postOnSocialMedia = async(data) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.post('post', data, config)
  return response
}

export const getStepper = async() => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get('dashboard/stepper', config)
  return response
}

export const updateTimeZone = async(timezoneId, shopId) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    timezone: timezoneId,
  }
  const response = await apiInstance.put(`shop/set-timezone/${shopId}`, data, config)
  return response
}
