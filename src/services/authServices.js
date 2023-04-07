import apiInstance from '../config/api/axios'

export const signIn = async(data, type) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  let url = ''
  if (type === 'login') {
    url = 'login'
  } else {
    url = `login/shop/${type}`
  }
  const response = await apiInstance.post(url, JSON.stringify(data), config)
  return response
}

export const signInShopify = async(code, hmac, host, shop, timestamp, type) => {
  let config = {
    headers: {
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
  const response = await apiInstance.post(`login/shop/callback/${type}`, JSON.stringify(data), config)
  return response
}

export const checkSession = async() => {
  const response = await apiInstance.get('user', null)
  return response
}


export const signup = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    name: form.name,
    password: form.password,
    email: form.email,
    password_confirmation: form.passwordConfirmation,
  }
  const response = await apiInstance.post('register', JSON.stringify(data), config)
  return response
}

export const updateProfile = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    name: form.name,
    //email: form.email,
    // address: form.address,
    // pincode: form.pincode,
    // country: form.country,
    phone: form.phone,
  }
  const response = await apiInstance.put('user/update', JSON.stringify(data), config)
  return response
}

export const changePassword = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    old_password: form.oldPassword,
    password: form.newPassword,
    password_confirmation: form.confirmPassword,
  }
  const response = await apiInstance.put('user/change-password', JSON.stringify(data), config)
  return response
}
export const setPassword = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    password: form.password,
    password_confirmation: form.confirmPassword,
  }
  const response = await apiInstance.put('user/set-password', JSON.stringify(data), config)
  return response
}
export const userLogout = async() => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const response = await apiInstance.get('user/logout', config)
  return response
}

export const forgotSentOTP = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    email: form.email,
  }
  const response = await apiInstance.post('forgot-password/otp/send', JSON.stringify(data), config)
  return response
}

export const forgotVerifyOTP = async(otpID, otp, type) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    otp_id: otpID,
    otp: otp,
    type: type,
  }
  const response = await apiInstance.post('forgot-password/otp/verify', JSON.stringify(data), config)
  return response
}

export const registerVerifyOTP = async(otpID, otp, type) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    otp_id: otpID,
    otp: otp,
    type: type,
  }
  const response = await apiInstance.post('register/otp/verify', JSON.stringify(data), config)
  return response
}

export const forgotChangePassword = async(otpID, otp, form, type) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    otp_id: otpID,
    otp: otp,
    type: type,
    password: form.password,
    password_confirmation: form.password_confirmation,
  }
  const response = await apiInstance.put('forgot-password/otp/change-password', JSON.stringify(data), config)
  return response
}

export const registerResendOTP = async(form) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  }
  const data = {
    email: form.email,
  }
  const response = await apiInstance.post('register/otp/send', JSON.stringify(data), config)
  return response
}
