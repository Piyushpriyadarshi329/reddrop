import axios from 'axios';
import {LOGIN_URL} from '../API_CONFIG';
import {CustomerDto, DataResponse, LoginRequest} from '../types';
import {useMutation} from '@tanstack/react-query';

export function useLoginMutation({
  onSuccess,
}: {
  onSuccess: (data?: CustomerDto) => void;
}) {
  return useMutation(
    (payload: LoginRequest) =>
      axios.post<DataResponse<CustomerDto>>(LOGIN_URL, payload),
    {
      onSuccess: data => onSuccess(data.data.data),
    },
  );
}
