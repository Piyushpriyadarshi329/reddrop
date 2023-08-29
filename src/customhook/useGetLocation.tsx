// GETDOCTORLIST_URL

import axios from 'axios';
import {GETLOCATION_URL} from '../API_CONFIG';

import {useQuery} from '@tanstack/react-query';
import {GetLocationListResponse} from '../types';

export function useGetLocation() {
  return useQuery(
    [],
    () => axios.get<GetLocationListResponse>(GETLOCATION_URL),
    {
      select: data => data.data,
    },
  );
}
