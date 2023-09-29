import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const useFCMToken = () => {
  const [fcm_token, setfcm_token] = useState('');
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        setfcm_token(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return fcm_token;
};
