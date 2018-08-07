import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {MainPageActions, MainPageTypes} from '../modules/main_page/MainPageState';
export {
  MainPageTypes,
  LoginTypes,
}
export default {
  ...MainPageActions,
  ...MemoActions,
  ...CardDetailActions,
  ...PetProfileActions,
  ...CardWriteActions,
  ...LoginActions,
  ...UserProfileActions,
  ...SearchActions,
};

