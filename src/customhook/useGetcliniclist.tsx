import axios from 'axios';
import {GETCLINICLIST_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {ClinicDto, GetClinicsResponse} from '../types';

export function useGetcliniclist(
  payload: any,
  onSuccess: (data: ClinicDto[] | undefined) => void,
) {
  return useQuery(
    ['CLINIC_LIST', payload],
    () => axios.post<GetClinicsResponse>(GETCLINICLIST_URL, payload),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
    },
  );
}
