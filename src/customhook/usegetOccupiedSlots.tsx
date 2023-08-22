import axios from 'axios';
import {GETOCCUPIEDSLOTS_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {GetOccupiedSlotsRequest, GetOccupiedSlotsResponse} from '../types';

export function usegetOccupiedSlots(payload: GetOccupiedSlotsRequest) {
  return useQuery(
    ['OccupiedSlots', payload],
    () => axios.post<GetOccupiedSlotsResponse>(GETOCCUPIEDSLOTS_URL, payload),
    {
      select: data => data.data.data,
      enabled: !!payload.doctor_clinic_id,
    },
  );
}
