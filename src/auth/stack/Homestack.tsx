import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppPages} from '../../appPages';
import BookApointment from '../../screen/DoctorDetails';
import Doctorlist from '../../screen/Doctorlist';
import DoctorlistSpecialitywise from '../../screen/DoctorlistSpecialitywise';
import Home from '../../screen/Home/Home';

export default function Homestack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppPages.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.BookApointment}
        component={BookApointment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Doctorlist}
        component={Doctorlist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.DoctorlistSpecialitywise}
        component={DoctorlistSpecialitywise}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
