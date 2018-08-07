import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { MainPageActions, MainPageTypes } from './MainPageState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants

function* requestGetCard() {
  try {
    const token = yield api.get(`${API_ROOT}/card/`,
    )
    if (token) {
      yield put(MainPageActions.getCardAllSuccess(token))
    }
  } catch (e) {
    yield put(MainPageActions.getCardAllFailure(e))
  }
}
export const MainPageSaga = [
  takeLatest(MainPageTypes.GET_CARD_ALL_REQUEST, requestGetCard)
]
