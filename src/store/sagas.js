import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { MainPageSaga } from '../modules/main_page/MainPageSaga'
import { CarDetailSaga } from '../modules/car_detail/CarDetailSaga'

function* mySaga(): any {
  yield all([
    ...MainPageSaga,
    ...LoginSaga,
    ...CarDetailSaga
  ])
}

export default mySaga
