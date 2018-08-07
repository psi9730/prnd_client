import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CarDetailReducer from '../modules/car_detail/carDetailState'
import MainPageReducer from '../modules/main_page/mainPageState'

const reducers = {
  routing,
  form,
  cars: CarDetailReducer,
  main: MainPageReducer,
  login: LoginReducer,
}


export default combineReducers(reducers)
