import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {GETCLINICLIST_URL} from '../API_CONFIG';
import {RootState} from '../redux/Store';
import {ClinicWithAddressAndImage, GetClinicsResponse} from '../types';

export function useGetcliniclist(
  payload: any,
  onSuccess?: (data: ClinicWithAddressAndImage[] | undefined) => void,
) {
  const cityName = useSelector((root: RootState) => root.Appstate.cityName);
  return useQuery(
    ['CLINIC_LIST', cityName, payload],
    () =>
      axios.post<GetClinicsResponse>(GETCLINICLIST_URL, {
        ...payload,
        city: cityName,
      }),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
      staleTime: Infinity,
    },
  );
}
