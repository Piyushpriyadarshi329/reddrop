import axios from 'axios';
import {LOGIN_URL} from '../API_CONFIG';
import {CustomerDto, DataResponse, LoginRequest} from '../types';
import {useMutation} from '@tanstack/react-query';
import {axiosAlert, errorAlert} from '../utils/useShowAlert';

export function useLoginMutation({
  onSuccess,
}: {
  onSuccess: (data?: CustomerDto) => void;
}) {
  return useMutation(
    (payload: LoginRequest) =>
      axios.post<DataResponse<CustomerDto>>(LOGIN_URL, payload),
    {
      onError: axiosAlert,

      // onSuccess: data => onSuccess(data.data.data),
      onSuccess: data => {
        if (data.data.Success) {
          onSuccess(data.data.data);
        } else {
          errorAlert(data.data.Message);
        }
      },
    },
  );
}
