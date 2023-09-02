import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/Home';
import Profile from '../screen/Profile';
import Appointment from '../screen/Appointment';
import Apointmentstack from './stack/Apointmentstack';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from './../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Afterlogin from './Afterlogin';
import Beforelogin from './Beforelogin';
import {updateuserdata} from '../redux/reducer/Authreducer';
import Splashscreen from './Splashscreen';

const Tab = createBottomTabNavigator();

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
        <>{isLoggedIn ? <Afterlogin /> : <Beforelogin />}</>
      )}
    </>
  );
}

//  carebook_client=>doctor and clinic

// node=>  carebook_services

//link2psp@gmail.com
