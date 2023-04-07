export function getToken(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setToken(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function removeToken(key) {
  return localStorage.removeItem(key)
}
export function removeAllToken() {
  return localStorage.clear()
}
