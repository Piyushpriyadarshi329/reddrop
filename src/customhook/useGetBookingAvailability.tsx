import axios from 'axios';
import {GETBOOKINGAVAILABILITY_URL} from '../API_CONFIG';

export async function useGetBookingAvailability(payload: any) {
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(GETBOOKINGAVAILABILITY_URL, payload);

      // console.log('res', res.data);

      myResolve(res.data);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
