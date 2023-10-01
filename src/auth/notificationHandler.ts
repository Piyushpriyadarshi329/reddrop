import {useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {updateuserdata} from '../redux/reducer/Authreducer';
import {CB_NOTIFICATION, NotificationData} from '../types';
import {axiosAlert, infoAlert} from '../utils/useShowAlert';

export const useNotificationHandler = () => {
  const qc = useQueryClient();
  const dispatch = useDispatch();
  const handler = (remoteMessage: {
    data: NotificationData;
    notification: {title: string; body?: string};
  }) => {
    const {data, notification} = remoteMessage;

    console.log(data);

    switch (data?.name) {
      case CB_NOTIFICATION.LIVE_STATUS:
        qc.invalidateQueries(['APPOINTMENTS']);
        return;

      case CB_NOTIFICATION.PAYMENT_CLOSURE:
        dispatch(updateuserdata({paymentStatus: data.status}));
        return;
      case CB_NOTIFICATION.FIRST_SLOT_STARTED:
        console.log(CB_NOTIFICATION.FIRST_SLOT_STARTED, notification);
        qc.invalidateQueries(['APPOINTMENTS']);
        infoAlert(notification.title, undefined, 2000);
        return;
      case CB_NOTIFICATION.VISIBLE_NOTIFICATION:
        infoAlert(notification.title, notification.body);
        return;
    }
  };
  return handler;
};
