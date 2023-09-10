import axios from 'axios';
import {LOGIN_URL} from '../API_CONFIG';
import {LoginRequest} from '../types';

export async function useLogin(payload: LoginRequest) {
  console.log('Login_URL=============>', LOGIN_URL, payload);

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(LOGIN_URL, payload);

      myResolve(res.data);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
