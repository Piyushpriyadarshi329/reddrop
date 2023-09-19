import axios from 'axios';
import {REGISTER_URL} from '../API_CONFIG';
import {useMutation} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';
import {SignupRequest} from '../types';

export function useRegisterQuery(props: {onSuccess: any}) {
  return useMutation(
    (payload: SignupRequest) => axios.post(REGISTER_URL, payload),
    {
      onError: axiosAlert,
      onSuccess: (data: any) => props.onSuccess(data?.data?.data),
    },
  );
}
