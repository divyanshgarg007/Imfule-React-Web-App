import apiInstance from '../config/api/axios'

export const companies = async(companyID) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`companies/${companyID}`, config)
  return response
}


export const updateCompany = async(companyID, data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.put(`companies/${companyID}`, data, config)
  return response
}
