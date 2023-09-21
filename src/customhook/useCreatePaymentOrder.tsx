import axios from 'axios';
import {createPayment_Url} from '../API_CONFIG';
import {CreatePaymentResponse} from '../types';

export async function useCreatePaymentOrder(payload: any) {
  let myPromise = new Promise<CreatePaymentResponse>(async function (
    myResolve,
    myReject,
  ) {
    try {
      var res = await axios.post(createPayment_Url, payload);

      myResolve(res.data);
    } catch (error: any) {
      console.log('error', JSON.stringify(error));
      myReject(error);
    }
  });

  return myPromise;
}
