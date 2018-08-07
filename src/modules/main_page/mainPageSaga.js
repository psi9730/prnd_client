import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { MainPageActions, MainPageTypes } from './MainPageState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
import _ from 'lodash'

const { API_ROOT } = Constants

function* requestGetBrands() {
  try {
    const token = yield api.get(`${API_ROOT}/brands/`,
    )
    if (token) {
      yield put(MainPageActions.getBrandsSuccess(token))
    }
  } catch (e) {
    yield put(MainPageActions.getBrandsFailure(e))
  }
}

function* requestGetModelGroups({brand_id}) {
  try {
    const token = yield api.get(`${API_ROOT}/brands/${brand_id}/model_groups`,
    )
    if (token) {
      yield put(MainPageActions.getModelGroupsSuccess(token))
    }
  } catch (e) {
    yield put(MainPageActions.getModelGroupsFailure(e))
  }
}

function* requestGetModels({model_group_id}) {
  try {
    const token = yield api.get(`${API_ROOT}/model_groups/${model_group_id}/models`,
    )
    if (token) {
      yield put(MainPageActions.getModelsSuccess(token))
    }
  } catch (e) {
    yield put(MainPageActions.getModelsFailure(e))
  }
}

function* requestGetCar({query}) {
  try {
    let token;
    if(!_.isEmpty(query))
    token = yield api.get(`${API_ROOT}/cars/?${query}`
    )
    else token = yield api.get(`${API_ROOT}/cars/`);
    if (token) {
      yield put(MainPageActions.getCarAllSuccess(token))
    }
  } catch (e) {
    yield put(MainPageActions.getCarAllFailure(e))
  }
}
export const MainPageSaga = [
  takeLatest(MainPageTypes.GET_CAR_ALL_REQUEST, requestGetCar),
  takeLatest(MainPageTypes.GET_MODELS_REQUEST, requestGetModels),
  takeLatest(MainPageTypes.GET_MODEL_GROUPS_REQUEST, requestGetModelGroups),
  takeLatest(MainPageTypes.GET_BRANDS_REQUEST, requestGetBrands)
]
