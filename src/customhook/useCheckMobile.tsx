import axios from 'axios';
import {checkMobile_Url} from '../API_CONFIG';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';

export function useCheckMobile(props: {onSuccess?: any; mobile: string}) {
  const qc = useQueryClient();

  return useQuery(
    ['checkMobile', props.mobile],
    () => axios.get(checkMobile_Url + props.mobile),
    {
      select: data => data.data.data,
      onSuccess: data => {
        props?.onSuccess?.(data.data);
      },
      enabled: props.mobile?.length == 10,
    },
  );
}
