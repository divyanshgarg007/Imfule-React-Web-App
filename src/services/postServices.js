import apiInstance from '../config/api/axios'

export const getPostedList = async(data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.get(`posts?type=schedule&per_page=${data.per_page}&page=${data.page}&order=asc&sort=cron_scheduled_at`, config)
  return response
}

export const archiveList = async(data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.get(`posts?type=archive&per_page=${data.per_page}&page=${data.page}&order=desc&sort=created_at`, config)
  return response
}
export const getCalendarPostedList = async(start, end) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`posts?start_date=${start}&end_date=${end}`, config)
  return response
}
export const deletePostedList = async(postId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.delete(`post/${postId}`, config)
  return response
}

export const deletePostedItem = async(postItemId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.delete(`post-items/${postItemId}`, config)
  return response
}

export const getSpecificPostedData = async(postId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`posts/${postId}?type=schedule`, config)
  return response
}

export const getSpecificArchiveData = async(postId) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }

  const response = await apiInstance.get(`posts/${postId}?type=archive`, config)
  return response
}

export const updatePostedData = async(postId, data) => {
  const config = {
    header: {
      accept: 'application/json',
    },
  }
  const response = await apiInstance.put(`post/${postId}`, data, config)
  return response
}
