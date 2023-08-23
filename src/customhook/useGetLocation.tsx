// GETDOCTORLIST_URL

import axios from 'axios';
import {GETLOCATION_URL} from '../API_CONFIG';

import {useQuery} from '@tanstack/react-query';
import {GetLocationListResponse} from '../types';

export function useGetLocation() {
  console.log('GETLOCATION_URL', GETLOCATION_URL);

  return useQuery(
    [],
    () => axios.get<GetLocationListResponse>(GETLOCATION_URL),
    {
      select: data => {
        console.log('data.data', data.data);
        return data.data;
      },
    },
  );
}
