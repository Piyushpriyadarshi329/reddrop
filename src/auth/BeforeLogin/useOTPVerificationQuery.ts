import {useMutation} from '@tanstack/react-query';

export const useSendOTP = ({onSuccess}: {onSuccess: () => void}) => {
  return useMutation(
    async (mobile: string) => {
      return console.log('API Call for OTP Send');
    },
    {
      onSuccess: onSuccess,
    },
  );
};

export const useVerifyOTP = ({onSuccess}: {onSuccess: () => void}) => {
  return useMutation(
    async (payload: {mobile: string; otp: string}) => {
      return true;
    },
    {
      onSuccess: onSuccess,
    },
  );
};
