import AsyncStorage,{ KEYS }  from './Storage';

const AUTHENTICATION_STORAGE_KEY = 'accessToken';

export function getAuthenticationToken() {
  try {
    const token = AsyncStorage.get(AUTHENTICATION_STORAGE_KEY);
    if (token) {
      return token;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function setAuthenticationToken(token, username) {
  AsyncStorage.set(KEYS.username, username);
  return AsyncStorage.set(KEYS.accessToken, token.token);
}

export function clearAuthenticationToken() {
  AsyncStorage.remove(KEYS.username);
  return AsyncStorage.remove(KEYS.accessToken);
}

export function getUserId() {
  try {
    return AsyncStorage.get('UserId');
  } catch (e) {
    return null;
  }
}
