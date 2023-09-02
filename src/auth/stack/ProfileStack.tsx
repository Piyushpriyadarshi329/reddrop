import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppPages} from '../../appPages';
import BookApointment from '../../screen/DoctorDetails';
import Doctorlist from '../../screen/Doctorlist';
import Profile from '../../screen/Profile';

export default function ProfileStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppPages.Profile}
        component={Profile}
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
    </Stack.Navigator>
  );
}
