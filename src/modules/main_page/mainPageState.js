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
  brands: [],
  groups: [],
  models: [],
  brandValue: "",
  groupValue: "",
  modelValue: "",
  brandIndex:-1,
  groupIndex:-1,
  modelIndex:-1,
  isBrandChecked: false,
  isGroupChecked: false,
  isModelChecked: false,
  count: 0,
  cars:[],
  order: "recent",
  next:"",
}

// Action Creators

export const { Types: MainPageTypes, Creators: MainPageActions } = createActions(
  actionsGenerator({
    getBrandsRequest:[],
    getModelGroupsRequest:['brandId'],
    getModelsRequest:['modelGroupId'],
    getCarAllRequest:['query'],
    setOrderRequest:['order'],
    setBrandRequest:['brandValue','brandIndex','isBrandChecked'],
    setGroupRequest:['groupValue','groupIndex','isGroupChecked'],
    setModelRequest:['modelValue','modelIndex','isModelChecked'],
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
        count: action.payload.count,
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
        brands: action.payload,
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
        models: action.payload,
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
        groups: action.payload,
        loading: false,
      };
    case MainPageTypes.SET_MODEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.SET_MODEL_SUCCESS:
      return {
        ...state,
        modelValue: action.payload.modelValue,
        modelIndex: action.payload.modelIndex,
        isModelChecked: action.payload.isModelChecked,
        loading: false,
      }
    case MainPageTypes.SET_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.SET_GROUP_SUCCESS:
      return {
        ...state,
        groupValue: action.payload.groupValue,
        groupIndex: action.payload.groupIndex,
        isGroupChecked: action.payload.isGroupChecked,
        loading: false,
      };
    case MainPageTypes.SET_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.SET_BRAND_SUCCESS:
      return {
        ...state,
        brandValue: action.payload.brandValue,
        brandIndex: action.payload.brandIndex,
        isBrandChecked: action.payload.isBrandChecked,
        loading: false,
      };
    case MainPageTypes.SET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.SET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        loading: false,
      };
    case MainPageTypes.SET_ORDER_FAILURE:
    case MainPageTypes.SET_BRAND_FAILURE:
    case MainPageTypes.SET_GROUP_FAILURE:
    case MainPageTypes.SET_MODEL_FAILURE:
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
