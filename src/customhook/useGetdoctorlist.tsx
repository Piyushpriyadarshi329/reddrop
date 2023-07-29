import axios from 'axios';
import {GETDOCTORLIST_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {GetDoctorsListResponse, GetDotcorsListRequest} from '../types';

export function useGetdoctorlist(payload: GetDotcorsListRequest) {
  return useQuery(
    ['DOCTORS'],
    () => axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, payload),
    {
      select: data => data.data,
    },
  );
}
