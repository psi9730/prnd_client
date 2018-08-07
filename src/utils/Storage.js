// @flow
import store from 'store/dist/store.modern'

const namespace = 'StagramStorage'
export const KEYS = {
  user: 'user',
  login: 'login',
  userEmail: 'userEmail',
  username: 'username',
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
}

export const get = (key) => store.get(`@${namespace}:${key}`)
export const set = (key, value) => store.set(`@${namespace}:${key}`, value)
export const remove = (key) => store.remove(`@${namespace}:${key}`)
const clearAll = () => store.clearAll()


export const getToken = () => get(KEYS.accessToken)

export const saveToken = payload => set(KEYS.accessToken, payload.token)

export const removeTokens = () => {
  remove(KEYS.accessToken)
  remove(KEYS.refreshToken)
}

export default {get, set,remove}
