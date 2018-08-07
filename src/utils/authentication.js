import AsyncStorage from './Storage'
import {KEYS} from './Storage'
const AUTHENTICATION_STORAGE_KEY = 'accessToken'

export function getAuthenticationToken() {
  try {
    const token = AsyncStorage.get(AUTHENTICATION_STORAGE_KEY)
    if (token) {
      return token
    }
    return null
  } catch (e) {
    return null
  }
}

export function setAuthenticationToken(token) {
  return AsyncStorage.set(KEYS.accessToken, token.token)
}

export function clearAuthenticationToken() {
  AsyncStorage.remove(KEYS.userEmail);
  AsyncStorage.remove(KEYS.password);
  return AsyncStorage.remove(KEYS.accessToken);
}

export function getUserId() {
  try {
    return AsyncStorage.get('UserId')
  } catch (e) {
    return null
  }
}
