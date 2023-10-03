import axios from 'axios';
import {
  GETDOCTORLIST_URL,
  GET_DOCTOR,
  SearchDoctorUrl,
  getDoctorListBySpecialty,
} from '../../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {
  DoctorDto,
  GetDoctorResponse,
  GetDoctorsListResponse,
  GetDotcorsListRequest,
  SearchDoctorsListResponse,
} from '../../types';
import {useAlert} from '../../utils/useShowAlert';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Store';

export function useSearchDoctorList(payload: {name: string}) {
  const cityName = useSelector((root: RootState) => root.Appstate.cityName);
  return useQuery(
    ['SEARCHED_DOCTORS', cityName, payload],
    () =>
      axios.post<SearchDoctorsListResponse>(SearchDoctorUrl, {
        ...payload,
        city: cityName,
      }),
    {
      select: data => data.data.data,
    },
  );
}
export function useGetDoctorList(payload: GetDotcorsListRequest) {
  const cityName = useSelector((root: RootState) => root.Appstate.cityName);
  return useQuery(
    ['DOCTORS', cityName, payload],
    () =>
      axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, {
        ...payload,
        city: cityName,
      }),
    {
      select: data => data.data.data,
    },
  );
}
export function useGetDoctorListBySpecialty(payload: GetDotcorsListRequest) {
  const cityName = useSelector((root: RootState) => root.Appstate.cityName);
  return useQuery(
    ['DOCTORS', cityName, payload],
    () =>
      axios.post<GetDoctorsListResponse>(getDoctorListBySpecialty, {
        ...payload,
        city: cityName,
      }),
    {
      select: data => data.data.data,
    },
  );
}
export const useGetDoctor = (
  id: string,
  onSuccess?: (
    p?: DoctorDto & {
      profile_image: string;
      fees?: number | undefined;
    },
  ) => void,
) => {
  const {axiosAlert} = useAlert();
  return useQuery(
    ['DOCTOR', id],
    () => axios.post<GetDoctorResponse>(GET_DOCTOR, {id}),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};
