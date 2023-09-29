import {useEffect} from 'react';
import {useUpdateCustomer} from '../screen/Profile/useCustomerQuery';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useFCMToken} from '../common/hooks/useFCMToken';

export const useUpdateFCMToken = () => {
  const userId = useSelector((state: RootState) => state.Appstate.userid);
  const {mutate} = useUpdateCustomer(userId);
  const fcmToken = useFCMToken();
  useEffect(() => {
    if (userId && fcmToken) {
      mutate({
        fcmToken: fcmToken,
      });
    }
  }, [userId, mutate, fcmToken]);
  return;
};
