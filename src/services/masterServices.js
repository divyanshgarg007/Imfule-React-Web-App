import apiInstance from '../config/api/axios'

export const getCountries = async() => {
  const response = await apiInstance.get('countries')
  return response
}
export const getTimeZone = async() => {
  const response = await apiInstance.get('timezones')
  return response
}
export const getSetting = async() => {
  const response = await apiInstance.get('settings')
  return response
}
