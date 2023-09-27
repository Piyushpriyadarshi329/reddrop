import {useMutation} from '@tanstack/react-query';
import {verifyOTP_Url, sendOTP_Url, reSendOTP_Url} from '../../API_CONFIG';
import axios from 'axios';
import {axiosAlert} from '../../utils/useShowAlert';

export const useSendOTP = ({onSuccess}: {onSuccess: () => void}) => {
  return useMutation(
    (mobile: string) => {
      return axios.get(sendOTP_Url + mobile);
    },
    {
      onSuccess: onSuccess,
    },
  );
};

export const useReSendOTP = ({onSuccess}: {onSuccess: () => void}) => {
  return useMutation(
    (mobile: string) => {
      return axios.get(reSendOTP_Url + mobile);
    },
    {
      onSuccess: onSuccess,
    },
  );
};

export const useVerifyOTP = ({onSuccess}: {onSuccess: (data: any) => void}) => {
  return useMutation(
    async (payload: {mobile: string; otp: string}) => {
      return axios.post(verifyOTP_Url + payload.mobile, {
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
