import {call, put, takeLatest} from 'redux-saga/effects'
import api from '../../utils/api'
import {CarDetailActions, CarDetailTypes} from './carDetailState'
import {KEYS} from '../../utils/Storage'
import Storage from '../../utils/Storage'
import Constants from '../../constants/constants'

const {API_ROOT} = Constants;

function* requestGetCar({carId}: { cardId: string }) {
  try {
    const token = yield api.get(`${API_ROOT}/cars/${carId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `JWT ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CarDetailActions.getCarSuccess(token))
    }
  } catch (e) {
    yield put(CarDetailActions.getCarFailure(e))
  }
}

export const CarDetailSaga = [
  takeLatest(CarDetailTypes.GET_CAR_REQUEST, requestGetCar),
];
