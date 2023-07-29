import axios from 'axios';
import {REGISTER_URL} from '../API_CONFIG';

export async function useLogin(payload: any) {
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

      if (res?.data?.Success && res?.status == 200) {
        myResolve(res.data);
      } else {
        myReject({statuscode: 401});
      }
    } catch (error: any) {
      console.log('error', error);
      if (error?.response?.statuscode == 429) {
        myReject({statuscode: 429});
        return;
      } else {
        myReject({statuscode: 401});
      }
    }
  });

  return myPromise;
}
