import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {texts} from '../asset/constants';

export const errorAlert = (text1?: string, text2?: string) =>
  Toast.show({type: 'error', text1: text1 ?? 'Something went wrong', text2});

export const successAlert = (text1: string, text2?: string) =>
  Toast.show({type: 'success', text1, text2});

export const infoAlert = (text1: string, text2?: string) =>
  Toast.show({type: 'info', text1, text2, visibilityTime: 5000});

export const axiosAlert = (e: any) => {
  try {
    if (e.response) {
      if (e.response.data) {
        errorAlert(
          e.response.data.data?.message || e.response.data.Message,
          e.response.data.data?.message2 ||
            e.response.data.Message2 ||
            undefined,
        );
      } else {
        errorAlert(texts.SomethingWentWrong);
      }
    }
  } catch (e) {
    errorAlert(texts.SomethingWentWrong);
  }
};

export const useAlert = () => {
  return {errorAlert, successAlert, axiosAlert, infoAlert};
};

export const errorCodeToReason = {
  1064: 'SQL Error',
  1062: 'Duplicate Entry',
};
