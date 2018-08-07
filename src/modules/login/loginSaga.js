import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'
import axios from 'axios';
import {KEYS} from "../../utils/Storage";
import Storage from "../../utils/Storage";
const { API_ROOT } = Constants;

function* requestLogin({ userEmail, password }: {userEmail: string, password: string}) {
  const body = {
    email: userEmail,
    password,
  }

  try {
    const token = yield api.post(`${API_ROOT}/login`, body
    )
    if (token) {
      console.log(token,"token")
      console.log(token.token,"token2");
      yield setAuthenticationToken(token,userEmail,password);
      console.log(Storage.get(KEYS.accessToken),"access")
      yield put(LoginActions.loginSuccess(token));
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }
}

function* requestSignup({ email, password,
                          username,userProfileImage,userBirthDay,petName, petProfileImage,petBirthDay }
                          : {email:string, password:string,
  username:string,userProfileImage:any,userBirthDay:any,petName:string, petProfileImage:any,petBirthDay:string }) {
  const formData = new FormData();
  const data = {
    email:email, password,
    username,userBirthDay,petName, petBirthDay,userProfileImage,petProfileImage
  };
  for(const key in data){
    if(key==='userProfileImage' || key ==="petProfileImage"){
        formData.append('file', data[key]);
    }
    else formData.append(key,data[key])
  }

  for(var pair of formData.entries()) {
    console.log(pair[0]+ ', '+ pair[1]);
  }
  console.log(formData,"formData");
  try {
    yield api.post(`${API_ROOT}/register/`,formData, { isFormData: true }
    );
    yield put(LoginActions.signUpSuccess());
    /*
    if (token) {
      const url = `${API_ROOT}/user/`;
      const formData = new FormData();
      formData.append('file',userProfileImage)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const url2 = `${API_ROOT}/pet/`;
      const formData2 = new FormData();
      formData2.append('file',petProfileImage)
      const config2 = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.put(url, formData,config).then(()=>axios.put(url2,formData2,config2)).then(()=>
        setAuthenticationToken(token,email,password)
      ).then(()=>put(LoginActions.signUpSuccess(token))).catch((e)=>console.log(e));
    }*/
  } catch (e) {
    yield put(LoginActions.signUpFailure(e))
  }
}

function* requestCheckDuplicate({ userEmail }: {userEmail: string}) {
  try {
    const token = yield api.get(`${API_ROOT}/user/${userEmail}`
    )
    if (token) {
      yield put(LoginActions.checkDuplicateSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.checkDuplicateFailure(e))
  }
}
function* requestCreatePet({ petName,petProfileImage,petBirthDay }: { petName:string, petProfileImage:any, petBirthDay:any}) {

  try {
    const token = yield api.post(`${API_ROOT}/pet`,body
    )
    if (token) {
      yield put(LoginActions.createPetSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.createPetFailure(e))
  }
}

export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.SIGN_UP_REQUEST, requestSignup),
  takeLatest(LoginTypes.CHECK_DUPLICATE_REQUEST, requestCheckDuplicate),
  takeLatest(LoginTypes.CREATE_PET_REQUEST, requestCreatePet),
]
