import axios from 'axios';
import {BOOKSLOT_URL} from '../API_CONFIG';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {BookSlotRequest, BookSlotResponse} from '../types';
import {axiosAlert} from '../utils/useShowAlert';

export function useBookslot(props?: {onSuccess: any}) {
  const qc = useQueryClient();
  return useMutation(
    (payload: BookSlotRequest) =>
      axios.post<BookSlotResponse>(BOOKSLOT_URL, payload),
    {
      onSuccess: (...p) => {
        // console.log(p[0]);
        qc.invalidateQueries(['APPOINTMENTS']);
        props?.onSuccess?.(...p);
      },
      onError: axiosAlert,
    },
  );
}
