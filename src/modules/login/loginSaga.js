import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'
import axios from 'axios';
import {KEYS} from "../../utils/Storage";
import Storage from "../../utils/Storage";
const { API_ROOT } = Constants;

function* requestLogin({ username, password }: {username: string, password: string}) {
  const body = {
    username: username,
    password,
  }

  try {
    const token = yield api.post(`${API_ROOT}/login`, body
    )
    if (token) {
      yield setAuthenticationToken(token,username,password);
      console.log(Storage.get(KEYS.accessToken),"access");
      yield put(LoginActions.loginSuccess(username));
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }
}

export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
]
