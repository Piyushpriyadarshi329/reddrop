import {PermissionsAndroid} from 'react-native';

const requestNotificationPermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return result;
};

const checkNotificationPermission = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  return result;
};

export const useNotificationPermission = async () => {
  const checkPermission = await checkNotificationPermission();
  if (!checkPermission) {
    const request = await requestNotificationPermission();
    if (request !== PermissionsAndroid.RESULTS.GRANTED) {
      // permission not granted
    }
  }
};
