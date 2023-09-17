import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from './../redux/Store';

import {updateuserdata} from '../redux/reducer/Authreducer';
import Afterlogin from './Afterlogin';
import Beforelogin from './BeforeLogin';
import Splashscreen from './Splashscreen';

export default function Auth() {
  const isLoggedIn = useSelector((state: RootState) => state.Appstate.islogin);
  const dispatch = useDispatch();

  async function getsayncdata() {
    try {
      let asyncdata = await AsyncStorage.getItem('userdata');
      if (asyncdata) {
        asyncdata = JSON.parse(asyncdata);

        dispatch(updateuserdata(asyncdata));
      }
      setshowsplash(false);
    } catch (error) {
      console.log(error);
    }
  }

  const [showsplash, setshowsplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getsayncdata();
    }, 1500);
  }, []);

  return (
    <>
      {showsplash ? (
        <Splashscreen />
      ) : (
        <>{false ? <Afterlogin /> : <Beforelogin />}</>
      )}
    </>
  );
}
