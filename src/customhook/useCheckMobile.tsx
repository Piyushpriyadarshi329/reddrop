import axios from 'axios';
import {checkMobile_Url} from '../API_CONFIG';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {axiosAlert} from '../utils/useShowAlert';

export function useCheckMobile(props: {onSuccess?: any; mobile: string}) {
  const qc = useQueryClient();
  console.log('checkMobile', props.mobile);

  return useQuery(
    ['checkMobile', props.mobile],
    () => axios.get(checkMobile_Url + props.mobile),
    {
      select: data => data.data.data,
      onSuccess: data => {
        props?.onSuccess?.(data.data);
      },
      onError: error => console.log('error', error),
      enabled: props.mobile?.length == 10,
    },
  );
}

export function useCheckMobileMutation(props: {onSuccess?: any}) {
  const qc = useQueryClient();

  return useMutation((mobile: string) => axios.get(checkMobile_Url + mobile), {
    onSuccess: data => {
      props?.onSuccess?.(data.data);
    },
    onError: axiosAlert,
  });
}
