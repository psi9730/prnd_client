// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type MainPageState = {
  loading: boolean,
}

// Initial state
const initialState = {
  loading: false,
  cars:[],
  next:"",
}

// Action Creators

export const { Types: MainPageTypes, Creators: MainPageActions } = createActions(
  actionsGenerator({
    getBrandsRequest:[],
    getModelGroupsRequest:['brand_id'],
    getModelsRequest:['model_group_id'],
    getCarAllRequest:['query'],
  })
)

// Reducer
export default function MainPageReducer(state: MainPageState = initialState, action: Object = {}): MainPageState {
  switch (action.type) {
    case MainPageTypes.GET_CAR_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.GET_CAR_ALL_SUCCESS:
      console.log(action.payload,"payload");
      return {
        ...state,
        cars: action.payload.results,
        next: action.payload.next,
        loading: false,
      };
    case MainPageTypes.GET_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.GET_BRANDS_SUCCESS:
      console.log(action.payload,"payload");
      return {
        ...state,
        cars: action.payload.results,
        loading: false,
      };
    case MainPageTypes.GET_MODELS_REQUEST:
    return {
      ...state,
      loading: true,
    };
    case MainPageTypes.GET_MODELS_SUCCESS:
      console.log(action.payload,"payload");
      return {
        ...state,
        cars: action.payload.results,
        loading: false,
      };
    case MainPageTypes.GET_MODEL_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.GET_MODEL_GROUPS_SUCCESS:
      console.log(action.payload,"payload");
      return {
        ...state,
        cars: action.payload.results,
        loading: false,
      };
    case MainPageTypes.GET_MODELS_FAILURE:
    case MainPageTypes.GET_MODEL_GROUPS_FAILURE:
    case MainPageTypes.GET_CAR_ALL_FAILURE:
    case MainPageTypes.GET_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state
  }
}
