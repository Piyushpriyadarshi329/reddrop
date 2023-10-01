import axios from 'axios';
import {sku_URL} from '../API_CONFIG';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';
import {getAmountAndOffersResponse} from '../types';

export const useGetSKU = (payload: {customerId: string}) => {
  return useQuery(
    ['CUSTOMER', payload],
    () => axios.post<getAmountAndOffersResponse>(sku_URL, payload),
    {
      select: data => data.data.data,
    },
  );
};
