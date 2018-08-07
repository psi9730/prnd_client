import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CarDetailActions, CarDetailTypes} from '../modules/car_detail/carDetailState';
import {MainPageActions, MainPageTypes} from '../modules/main_page/mainPageState';
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

