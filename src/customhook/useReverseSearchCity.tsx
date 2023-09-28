import axios from 'axios';
import {reverseSearchCity_URL} from '../API_CONFIG';
import {useMutation} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';
import {SignupRequest} from '../types';

export function useReverseSearchCity(props: {onSuccess: any}) {
  return useMutation(
    (payload: {lat: number; lan: number}) =>
      axios.post(reverseSearchCity_URL, payload),
    {
      onError: axiosAlert,
      onSuccess: (data: any) => props.onSuccess(data?.data?.data),
    },
  );
}
