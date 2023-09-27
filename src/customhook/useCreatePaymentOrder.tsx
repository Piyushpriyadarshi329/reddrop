import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {createPayment_Url} from '../API_CONFIG';
import {CreatePaymentResponse} from '../types';
import {axiosAlert} from '../utils/useShowAlert';

export function useCreatePaymentOrder({onSuccess}: {onSuccess: any}) {
  return useMutation((payload: any) => axios.post(createPayment_Url, payload), {
    onSuccess: data => onSuccess(data.data.data),
    onError: axiosAlert,
  });
}
