import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CarDetailReducer from '../modules/car_detail/CarDetailState'
import MainPageReducer from '../modules/main_page/MainPageState'

const reducers = {
  routing,
  form,
  cars: CarDetailReducer,
  main: MainPageReducer,
  login: LoginReducer,
}


export default combineReducers(reducers)
