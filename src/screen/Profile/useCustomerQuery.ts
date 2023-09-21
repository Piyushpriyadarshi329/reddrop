import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {CUSTOMER_URL} from '../../API_CONFIG';
import {CustomerDto, DataResponse, UpdateCustomerRequest} from '../../types';
import {useAlert} from '../../utils/useShowAlert';

export const useGetCustomer = (id: string) => {
  return useQuery(
    ['CUSTOMER', id],
    () => axios.get<DataResponse<CustomerDto>>(`${CUSTOMER_URL}/${id}`),
    {
      select: data => data.data.data,
      enabled: !!id,
    },
  );
};

export const useUpdateCustomer = (id: string, onSuccess?: () => void) => {
  const {axiosAlert} = useAlert();

  const qc = useQueryClient();
  return useMutation(
    (payload: UpdateCustomerRequest) =>
      axios.put(`${CUSTOMER_URL}/${id}`, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['CUSTOMER']);
        onSuccess?.();
      },
      onError: axiosAlert,
    },
  );
};
