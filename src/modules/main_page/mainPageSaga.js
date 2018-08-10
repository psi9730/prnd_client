import { put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { MainPageActions, MainPageTypes } from './mainPageState';
import api from '../../utils/api';
import Constants from '../../constants/constants';
// import Storage, { KEYS } from '../../utils/petStagramStorage'

const { API_ROOT } = Constants;

function* requestGetBrands() {
  try {
    const token = yield api.get(`${API_ROOT}/brands/`,
    );
    if (token) {
      yield put(MainPageActions.getBrandsSuccess(token));
    }
  } catch (e) {
    yield put(MainPageActions.getBrandsFailure(e));
  }
}

function* requestGetModelGroups({ brandId }) {
  try {
    const token = yield api.get(`${API_ROOT}/brands/${brandId}/model_groups`,
    );
    if (token) {
      yield put(MainPageActions.getModelGroupsSuccess(token));
    }
  } catch (e) {
    yield put(MainPageActions.getModelGroupsFailure(e));
  }
}

function* requestGetModels({ modelGroupId }) {
  try {
    const token = yield api.get(`${API_ROOT}/model_groups/${modelGroupId}/models`,
    );
    if (token) {
      yield put(MainPageActions.getModelsSuccess(token));
    }
  } catch (e) {
    yield put(MainPageActions.getModelsFailure(e));
  }
}

function* requestGetCar({ query }) {
  try {
    let token;
    if (!_.isEmpty(query)) {
      token = yield api.get(`${API_ROOT}/cars/${query}`
      );
    } else token = yield api.get(`${API_ROOT}/cars/`);
    if (token) {
      yield put(MainPageActions.getCarAllSuccess(token));
    }
  } catch (e) {
    yield put(MainPageActions.getCarAllFailure(e));
  }
}
function* requestSetBrand({ brandValue, brandIndex, isBrandChecked }) {
  try {
    yield put(MainPageActions.setBrandSuccess({ brandValue, brandIndex, isBrandChecked }));
  } catch (e) {
    yield put(MainPageActions.setBrandFailure(e));
  }
}
function* requestSetGroup({ groupValue, groupIndex, isGroupChecked }) {
  try {
    yield put(MainPageActions.setGroupSuccess({ groupValue, groupIndex, isGroupChecked }));
  } catch (e) {
    yield put(MainPageActions.setGroupFailure(e));
  }
}
function* requestSetModel({ modelValue, modelIndex, isModelChecked }) {
  try {
    yield put(MainPageActions.setModelSuccess({ modelValue, modelIndex, isModelChecked }));
  } catch (e) {
    yield put(MainPageActions.setModelFailure(e));
  }
}
function* requestSetOrder({ order }) {
  try {
    yield put(MainPageActions.setOrderSuccess({ order }));
  } catch (e) {
    yield put(MainPageActions.setOrderFailure(e));
  }
}

export const MainPageSaga = [
  takeLatest(MainPageTypes.SET_ORDER_REQUEST, requestSetOrder),
  takeLatest(MainPageTypes.SET_MODEL_REQUEST, requestSetModel),
  takeLatest(MainPageTypes.SET_GROUP_REQUEST, requestSetGroup),
  takeLatest(MainPageTypes.SET_BRAND_REQUEST, requestSetBrand),
  takeLatest(MainPageTypes.GET_CAR_ALL_REQUEST, requestGetCar),
  takeLatest(MainPageTypes.GET_MODELS_REQUEST, requestGetModels),
  takeLatest(MainPageTypes.GET_MODEL_GROUPS_REQUEST, requestGetModelGroups),
  takeLatest(MainPageTypes.GET_BRANDS_REQUEST, requestGetBrands),
];
