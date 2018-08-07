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
  cards:[],
}

// Action Creators

export const { Types: MainPageTypes, Creators: MainPageActions } = createActions(
  actionsGenerator({
    getCardAllRequest:[],
  })
)

// Reducer
export default function MainPageReducer(state: MainPageState = initialState, action: Object = {}): MainPageState {
  switch (action.type) {
    case MainPageTypes.GET_CARD_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.GET_CARD_ALL_SUCCESS:
      console.log(action.payload,"payload");
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    case MainPageTypes.GET_CARD_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state
  }
}
