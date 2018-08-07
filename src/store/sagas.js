import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { MainPageSaga } from '../modules/main_page/MainPageSaga'

function* mySaga(): any {
  yield all([
    ...MainPageSaga,
    ...LoginSaga,
  ])
}

export default mySaga
