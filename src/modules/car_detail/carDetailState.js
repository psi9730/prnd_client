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
  name: "",
  location:  "",
  carNumber:  "",
  year:  "",
  fuel:  "",
  color: "",
  mileage:  "",
  transmission:  "",
  initialRegistrationDate:  "",
  images:  [],
  mainImage: null,
  startedAt:  "",
  endAt: "",
  status:  "",
  myBid: "",
  bidsCount: "",
  visitsCount:  "",

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
    case CarDetailTypes.GET_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CarDetailTypes.GET_CAR_SUCCESS:
      return {
        ...state,
        name: action.payload.detail.name,
        location:  action.payload.detail.location,
        carNumber:  action.payload.detail.car_number,
        year:  action.payload.detail.year,
        fuel:  action.payload.detail.fuel,
        color: action.payload.detail.color,
        mileage: action.payload.detail.mileage,
        transmission:  action.payload.detail.transmission,
        initialRegistrationDate:  action.payload.detail.initial_registrations_date,
        images:  action.payload.detail.images,
        mainImage: action.payload.detail.main_image,
        startedAt: action.payload.auction.started_at,
        endAt: action.payload.auction.end_at,
        status: action.payload.auction.status,
        myBid: action.payload.auction.my_bid,
        bidsCount: action.payload.auction.bids_count,
        visitsCount:  action.payload.auction.visits_count,
        loading:false,
      };
    case CarDetailTypes.GET_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state
  }
}
