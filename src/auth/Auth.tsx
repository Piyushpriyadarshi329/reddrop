import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Appointment from '../screen/Appointment';
import Apointmentstack from './Apointmentstack';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from './../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Afterlogin from './Afterlogin';
import Beforelogin from './Beforelogin';
import {updateuserdata} from '../redux/reducer/Authreducer';

const Tab = createBottomTabNavigator();

export default function Auth() {
  const {Appstate} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  console.log('Appstate', Appstate);
  useEffect(() => {
    getsayncdata();
  }, []);

  async function getsayncdata() {
    try {
      let asyncdata = await AsyncStorage.getItem('userdata');
      if (asyncdata) {
        asyncdata = JSON.parse(asyncdata);

        dispatch(updateuserdata(asyncdata));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <>{Appstate.islogin ? <Afterlogin /> : <Beforelogin />}</>;
}

//  carebook_client=>doctor and clinic

// node=>  carebook_services

//link2psp@gmail.com
