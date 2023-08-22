import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {CUSTOMER_URL} from '../../API_CONFIG';
import {CustomerDto, DataResponse} from '../../types';

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
