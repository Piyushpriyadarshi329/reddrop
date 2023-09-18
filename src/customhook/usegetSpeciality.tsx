// GETDOCTORLIST_URL

import axios from 'axios';
import {GETSPECIALITY_URL} from '../API_CONFIG';

// export async function usegetSpeciality() {
//   // const config: any =  {
//   //     headers: {
//   //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
//   //     },
//   //   };

//   let myPromise = new Promise(async function (myResolve, myReject) {
//     try {
//       var res = await axios.get(GETSPECIALITY_URL);

//       console.log('res', res.data);

//       myResolve(res.data.data);
//     } catch (error: any) {
//       myReject(error);
//     }
//   });

//   return myPromise;
// }

import {useQuery} from '@tanstack/react-query';
import {
  GetDoctorsListResponse,
  GetDotcorsListRequest,
  GetSpecialityListResponse,
} from '../types';

export function usegetSpeciality() {
  return useQuery(
    ['SPECIALTIES'],
    () => axios.get<GetSpecialityListResponse>(GETSPECIALITY_URL),
    {
      select: data => data.data,
      staleTime: Infinity,
    },
  );
}
