import {useMutation} from '@tanstack/react-query';
import {verifyOTP_Url, sendOTP_Url} from '../../API_CONFIG';
import axios from 'axios';
import {axiosAlert} from '../../utils/useShowAlert';

export const useSendOTP = ({onSuccess}: {onSuccess: () => void}) => {
  return useMutation(
    (mobile: string) => {
      return axios.post(sendOTP_Url + mobile);
    },
    {
      onSuccess: onSuccess,
    },
  );
};

export const useVerifyOTP = ({onSuccess}: {onSuccess: (data: any) => void}) => {
  return useMutation(
    async (payload: {mobile: string; otp: string}) => {
      return axios.post(verifyOTP_Url, {
        userId: payload.mobile,
        otp: payload.otp,
      });
    },
    {
      onSuccess: data => {
        onSuccess(data.data.data);
      },
      onError: axiosAlert,
    },
  );
};
