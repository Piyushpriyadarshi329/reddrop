import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {BASE_URL} from '../../API_CONFIG';
import {GetAppointmentResponse, GetAppointmentsRequest} from '../../types';

export function useGetAppointments(payload: GetAppointmentsRequest) {
  return useQuery(
    ['APPOINTMENTS', payload],
    () =>
      axios.post<GetAppointmentResponse>(
        `${BASE_URL}/customer/${payload.customerId}/getBookings`,
        payload,
      ),
    {
      select: data => data.data.data,
      staleTime: 1000,
    },
  );
}
