import { call, put, takeLatest } from 'redux-saga/effects';
import { setAuthenticationToken } from '../../utils/authentication';
import api from '../../utils/api';
import { LoginActions, LoginTypes } from './loginState';
import Constants from '../../constants/constants';

const { API_ROOT } = Constants;

function* requestLogin({ username, password }: {username: string, password: string}) {
  const body = {
    username,
    password,
  };

  try {
    const token = yield api.post(`${API_ROOT}/login/`, body
    );
    if (token) {
      yield setAuthenticationToken(token, username);
      yield put(LoginActions.loginSuccess(username));
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e));
  }
}

export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
];
