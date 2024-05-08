import Cookies from 'js-cookie'

export const setToken = (token: string) => {
  Cookies.set('token', token)
}

export const getToken = () => {
  const token = Cookies.get('token')
  return token
}

export const deleteToken = () => {
  Cookies.remove('token')
} 