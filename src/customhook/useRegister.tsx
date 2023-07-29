import axios from 'axios';
import {REGISTER_URL} from '../API_CONFIG';

export async function useRegister(payload: any) {
  console.log('REGISTER_URL=============>', REGISTER_URL, payload);

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log('REGISTER_URL=============>', REGISTER_URL, payload);

      var res = await axios.post(REGISTER_URL, payload);

      console.log('res', res.data);

      myResolve(res.data);
    } catch (error: any) {
      console.log('error', error);
      myReject({statuscode: 401});
    }
  });

  return myPromise;
}
