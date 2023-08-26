import axios from 'axios';
import {GETBOOKINGAVAILABILITY_URL} from '../../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {
  DataResponse,
  GetAvailabilityRequest,
  GetBookingAvailabilityRequest,
  GetBookingvavilabilityResponse,
} from '../../types';

export function useGetBookingAvailability(
  payload: GetBookingAvailabilityRequest,
) {
  return useQuery(
    ['AVAILABILITY', payload],
    () =>
      axios.post<DataResponse<GetBookingvavilabilityResponse>>(
        GETBOOKINGAVAILABILITY_URL,
        payload,
      ),
    {
      select: data => data.data.data,
      enabled: !!payload.clinic_id && !!payload.doctor_id && !!payload.date,
      staleTime: 1000,
    },
  );
}
