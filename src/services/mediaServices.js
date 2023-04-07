import apiInstance from '../config/api/axios'

export const getMediaList = async(data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.get(`cloud/media?per_page=${data.per_page}&page=${data.page}&order=${data.order}&sort=${data.sort}`, config)
  return response
}
export const addMedia = async(data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.post('cloud/media', data, config)
  return response
}
export const deleteMedia = async(mediaId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.delete(`cloud/media/${mediaId}`, config)
  return response
}
