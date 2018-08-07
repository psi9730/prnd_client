// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type CarDetailState = {
}

// Initial state
const initialState = {
  getCarRequest: Function,
}

// Action Creators

export const { Types: CarDetailTypes, Creators: CarDetailActions } = createActions(
  actionsGenerator({
    getCarRequest: ['carId'],
  })
)

// Reducer
export default function CarDetailReducer(state: CarDetailState = initialState, action: Object = {}): CarDetailState {
  switch (action.type) {
    case CarDetailTypes.GET_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CarDetailTypes.GET_CARD_SUCCESS:
      return {
        ...state,
        pet: action.payload.pet_id,
        owner: action.payload.writer,
        title: action.payload.title,
        pictures: action.payload.pictures,
        text: action.payload.text,
        like: action.payload.like_id,
        created: action.payload.date,
        comments: action.payload.comments,
        loading:false,
      };
    case CarDetailTypes.GET_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state
  }
}
