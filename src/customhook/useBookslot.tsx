import axios from 'axios';
import {BOOKSLOT_URL} from '../API_CONFIG';

export async function useBookslot(payload: any) {
  console.log('payload', payload);
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(BOOKSLOT_URL, payload);

      console.log('res', res.data);

      if (res?.data?.Success && res?.status == 200) {
        myResolve(res.data);
      } else {
        myReject({statuscode: 401});
      }
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
