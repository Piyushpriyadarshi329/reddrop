import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {UPDATESLOTSSTATUS_URL} from '../API_CONFIG';
import {updateSlotsStatusRequest} from '../types';

export function useUpdateSlotStatus(onSuccess: any) {
  const qc = useQueryClient();

  return useMutation(
    (payload: updateSlotsStatusRequest) =>
      axios.post(UPDATESLOTSSTATUS_URL, payload),
    {
      onSuccess: (...p) => {
        qc.invalidateQueries(['APPOINTMENTS']);
        onSuccess?.(...p);
      },
    },
  );
}
