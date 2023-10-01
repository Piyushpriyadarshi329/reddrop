import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {adBanners} from '../../API_CONFIG';
import {AdDataResponse} from '../../types';

export const useAdBannerQuery = () => {
  return useQuery(['ADBanners'], () => axios.get<AdDataResponse>(adBanners), {
    select: data => data.data.data,
  });
};
