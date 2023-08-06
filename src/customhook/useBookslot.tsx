import axios from 'axios';
import {BOOKSLOT_URL} from '../API_CONFIG';
import {useMutation} from '@tanstack/react-query';
import {BookSlotRequest, BookSlotResponse} from '../types';

export function useBookslot(props?: {onSuccess: any}) {
  return useMutation(
    (payload: BookSlotRequest) =>
      axios.post<BookSlotResponse>(BOOKSLOT_URL, payload),
    {
      onSuccess: props?.onSuccess,
    },
  );
}
