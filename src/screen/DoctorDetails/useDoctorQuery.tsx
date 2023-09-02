import axios from 'axios';
import {GETDOCTORLIST_URL, GET_DOCTOR} from '../../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {
  DoctorDto,
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
  onSuccess?: (p?: DoctorDto) => void,
) => {
  const {axiosAlert} = useAlert();
  return useQuery(
    ['DOCTOR', id],
    () => axios.post<GetDoctorsListResponse>(GET_DOCTOR, {id}),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};
