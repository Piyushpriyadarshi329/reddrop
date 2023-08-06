import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GETAVAILABLITY_URL} from '../API_CONFIG';
import {GetAvailabilityRequest, GetAvailabilityResponse} from '../types';

export function useGetavailability(payload: GetAvailabilityRequest) {
  return useQuery(
    ['AVAILABILITY', payload],
    () => axios.post<GetAvailabilityResponse>(GETAVAILABLITY_URL, payload),
    {
      select: data => data.data.data,
    },
  );
}
