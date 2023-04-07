import apiInstance from '../config/api/axios'

export const getSubscription = async(companyID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get('plan', config)
  return response
}

