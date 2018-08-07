import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CardWriteReducer from '../modules/card_write/CardWriteState'
//import memoReducer from '../modules/memo/memoState'

import MainPageReducer from '../modules/main_page/MainPageState'

const reducers = {
  routing,
  form,
  main: MainPageReducer,
  login: LoginReducer,
}


export default combineReducers(reducers)
