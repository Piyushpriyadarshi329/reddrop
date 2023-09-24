import axios, {AxiosError} from 'axios';
import {checkCode_URL} from '../API_CONFIG';
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';
import {CodeType} from '../types';

export function useCheckReferralCode(props: {onSuccess?: any}) {
  const qc = useQueryClient();

  return useMutation(
    (payload: {customerId: string; referralCode: string; codeType: CodeType}) =>
      axios.post(checkCode_URL, payload),

    {
      onSuccess: data => {
        props?.onSuccess?.(data.data.data);
      },
      onError: axiosAlert,
    },
  );
}
