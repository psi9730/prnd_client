// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'
import {MainPageTypes} from '../main_page/mainPageState';

type LoginState = {
  loading: boolean,
  error: string,
}

// Initial state
const initialState = {
  loading: false,
  error: null,
}

// Action Creators

export const { Types: LoginTypes, Creators: LoginActions } = createActions(
  actionsGenerator({
    loginRequest: ['username', 'password'],
    setUsername:['username'],
  })
)

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.payload,
      }
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LoginTypes.SET_USERNAME:
      return {
        ...state,
        username: action.username,
        loading: false,
      };
    default:
      return state
  }
}
