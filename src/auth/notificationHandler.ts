import {useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {updateuserdata} from '../redux/reducer/Authreducer';
import {CB_NOTIFICATION, NotificationData} from '../types';

export const useNotificationHandler = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch();
  const handler = (data?: NotificationData) => {
    console.log(data);
    switch (data?.name) {
      case CB_NOTIFICATION.LIVE_STATUS:
        qc.invalidateQueries(['APPOINTMENTS']);
        return;

      case CB_NOTIFICATION.PAYMENT_CLOSURE:
        dispatch(updateuserdata({paymentStatus: data.status}));
    }
  };
  return handler;
};
