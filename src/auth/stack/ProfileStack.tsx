import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppPages} from '../../appPages';
import BookApointment from '../../screen/DoctorDetails';
import DoctorsList from '../../screen/Home/DoctorList';
import Profile from '../../screen/Profile';
import Contact from '../../screen/Profile/Contact';

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
        component={DoctorsList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Contact}
        component={Contact}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
