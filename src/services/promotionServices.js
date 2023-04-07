import apiInstance from '../config/api/axios'

export const promotionPostOnSocialMedia = async(data) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.post('post', data, config)
  return response
}
