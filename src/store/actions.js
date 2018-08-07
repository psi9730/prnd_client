import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CarDetailActions, CarDetailTypes} from '../modules/car_detail/CarDetailState';
import {MainPageActions, MainPageTypes} from '../modules/main_page/MainPageState';
export {
  MainPageTypes,
  LoginTypes,
  CarDetailTypes,
}
export default {
  ...MainPageActions,
  ...LoginActions,
  ...CarDetailActions,
};

