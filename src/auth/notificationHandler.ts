import {useQueryClient} from '@tanstack/react-query';
import {CB_NOTIFICATION, NotificationData} from '../types';

export const useNotificationHandler = () => {
  const qc = useQueryClient();
  const handler = (data?: NotificationData) => {
    console.log(data);
    switch (data?.name) {
      case CB_NOTIFICATION.LIVE_STATUS:
        qc.invalidateQueries(['APPOINTMENTS']);
        return;
    }
  };
  return handler;
};
