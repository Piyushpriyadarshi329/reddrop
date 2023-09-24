import {useEffect} from 'react';
import {useUpdateCustomer} from '../screen/Profile/useCustomerQuery';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import messaging from '@react-native-firebase/messaging';

export const useUpdateFCMToken = () => {
  const userId = useSelector((state: RootState) => state.Appstate.userid);
  const {mutate} = useUpdateCustomer(userId);

  useEffect(() => {
    (async () => {
      if (userId) {
        const fcmToken = await messaging().getToken();
        mutate({
          fcmToken: fcmToken,
        });
      }
    })();
  }, [userId, mutate]);
  return;
};
