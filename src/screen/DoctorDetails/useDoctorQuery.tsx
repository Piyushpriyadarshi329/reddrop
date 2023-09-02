import axios from 'axios';
import {GETDOCTORLIST_URL, GET_DOCTOR} from '../../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {
  DoctorDto,
  GetDoctorResponse,
  GetDoctorsListResponse,
  GetDotcorsListRequest,
} from '../../types';
import {useAlert} from '../../utils/useShowAlert';

export function useGetDoctorList(payload: GetDotcorsListRequest) {
  return useQuery(
    ['DOCTORS', payload],
    () => axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, payload),
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
